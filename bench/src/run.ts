// Orchestrator: plan the (skill × task × condition × trial) matrix, run each
// in isolation, and write one JSON file per run under bench/results/<sweep>/runs/.
//
// Usage: npm run bench -- --model claude-opus-4-8 --trials 5 \
//          [--skills underkill] [--tasks 01,02] [--sweep pilot] [--budget-usd 40]
//
// Append-only and resumable: run ids are deterministic and completed run files
// are skipped, so a crashed sweep continues where it left off.
import { execFileSync } from "node:child_process";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { runAgent } from "./agent.js";
import { collectMetrics } from "./metrics.js";
import { prepareWorkspace } from "./workspace.js";
import { verifyAcceptance, verifyRepro } from "./verify.js";
import type { Condition, RunResult, Task } from "./types.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CONCURRENCY = 3;

export interface Args {
  model: string;
  trials: number;
  skills: string[] | undefined;
  tasks: string[] | undefined;
  sweep: string | undefined;
  budgetUsd: number;
  conditions: Condition[];
}

export function parseArgs(argv: string[]): Args {
  const get = (flag: string) => {
    const i = argv.indexOf(flag);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  return {
    model: get("--model") ?? "claude-opus-4-8",
    trials: Number(get("--trials") ?? 5),
    skills: get("--skills")?.split(","),
    tasks: get("--tasks")?.split(","),
    sweep: get("--sweep"),
    budgetUsd: Number(get("--budget-usd") ?? 40),
    conditions: (get("--conditions")?.split(",") as Condition[]) ?? ["on", "off", "placebo"],
  };
}

export interface PlannedRun {
  skillId: string;
  taskId: string;
  condition: Condition;
  trial: number;
  runId: string;
}

// All arms stay adjacent per (task, trial) so every condition sees the same
// time-of-day, rate-limit, and model-load circumstances.
export function buildMatrix(
  skillId: string,
  taskIds: string[],
  trials: number,
  conditions: Condition[] = ["on", "off", "placebo"],
): PlannedRun[] {
  const matrix: PlannedRun[] = [];
  for (const taskId of taskIds) {
    for (let trial = 1; trial <= trials; trial++) {
      for (const condition of conditions) {
        matrix.push({
          skillId,
          taskId,
          condition,
          trial,
          runId: `${skillId}--${taskId}-${condition}-t${trial}`,
        });
      }
    }
  }
  return matrix;
}

async function listDirs(dir: string): Promise<string[]> {
  return (await readdir(dir, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

async function loadTask(skillId: string, taskId: string): Promise<Task> {
  return JSON.parse(
    await readFile(path.join(root, "skills", skillId, "tasks", taskId, "task.json"), "utf8"),
  );
}

async function executeRun(
  planned: PlannedRun,
  opts: { model: string; cliVersion: string; runsDir: string; logsDir: string },
): Promise<RunResult> {
  const task = await loadTask(planned.skillId, planned.taskId);
  const prompt = await readFile(
    path.join(root, "skills", planned.skillId, "tasks", planned.taskId, "prompt.md"),
    "utf8",
  );
  const { dir, configDir } = await prepareWorkspace(planned.skillId, planned.taskId, planned.condition);
  try {
    const agent = await runAgent({
      runId: planned.runId,
      task,
      dir,
      configDir,
      model: opts.model,
      prompt,
      logDir: opts.logsDir,
    });
    const metrics = await collectMetrics(dir, task);
    // keep the diff as evidence before the workspace is deleted
    const patch = execFileSync("git", ["-C", dir, "diff", "--cached", "HEAD"], { encoding: "utf8" });
    await writeFile(path.join(opts.logsDir, `${planned.runId}.patch`), patch);
    const verdict = await verifyAcceptance(dir, planned.skillId, planned.taskId);
    const reproVerified = task.repro ? await verifyRepro(dir) : null;
    return {
      runId: planned.runId,
      skillId: planned.skillId,
      taskId: planned.taskId,
      condition: planned.condition,
      trial: planned.trial,
      model: opts.model,
      cliVersion: opts.cliVersion,
      ranAt: new Date().toISOString(),
      accepted: verdict.accepted,
      failingTests: verdict.failingTests,
      taskScalar: verdict.taskScalar,
      reproVerified,
      locAddedSrc: metrics.locAddedSrc,
      locAddedTest: metrics.locAddedTest,
      filesCreated: metrics.filesCreated,
      depsAdded: metrics.depsAdded,
      exportedSymbols: metrics.exportedSymbols,
      trapsTriggered: metrics.trapsTriggered,
      numTurns: agent.numTurns,
      totalCostUsd: agent.totalCostUsd,
      durationMs: agent.durationMs,
    };
  } finally {
    await rm(dir, { recursive: true, force: true });
    await rm(configDir, { recursive: true, force: true });
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const cliVersion = execFileSync("claude", ["--version"], { encoding: "utf8" }).trim();

  const skillIds = args.skills ?? (await listDirs(path.join(root, "skills")));
  const matrix: PlannedRun[] = [];
  for (const skillId of skillIds) {
    const allTasks = await listDirs(path.join(root, "skills", skillId, "tasks"));
    const taskIds = args.tasks ? allTasks.filter((t) => args.tasks!.includes(t)) : allTasks;
    matrix.push(...buildMatrix(skillId, taskIds, args.trials, args.conditions));
  }

  const sweep = args.sweep ?? args.model;
  const sweepDir = path.join(root, "bench/results", sweep);
  const runsDir = path.join(sweepDir, "runs");
  const logsDir = path.join(sweepDir, "logs");
  await mkdir(runsDir, { recursive: true });
  await mkdir(logsDir, { recursive: true });
  await writeFile(
    path.join(sweepDir, "sweep.json"),
    JSON.stringify({ model: args.model, cliVersion, startedAt: new Date().toISOString(), args }, null, 2),
  );

  const pending = matrix.filter((m) => !existsSync(path.join(runsDir, `${m.runId}.json`)));
  console.log(`${matrix.length} planned, ${matrix.length - pending.length} already done, ${pending.length} to run`);

  let spent = 0;
  let stopped = false;
  let index = 0;
  const worker = async () => {
    while (!stopped && index < pending.length) {
      const planned = pending[index++];
      if (spent >= args.budgetUsd) {
        stopped = true;
        console.error(`budget cap $${args.budgetUsd} reached — stopping new runs`);
        break;
      }
      console.log(`▶ ${planned.runId}`);
      try {
        const result = await executeRun(planned, { model: args.model, cliVersion, runsDir, logsDir });
        spent += result.totalCostUsd;
        await writeFile(path.join(runsDir, `${planned.runId}.json`), JSON.stringify(result, null, 2));
        console.log(
          `✓ ${planned.runId} accepted=${result.accepted} traps=${result.trapsTriggered.length} srcLoc=${result.locAddedSrc} $${result.totalCostUsd.toFixed(2)} (total $${spent.toFixed(2)})`,
        );
      } catch (err) {
        console.error(`✗ ${planned.runId} failed: ${err instanceof Error ? err.message : err}`);
      }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`done. spent ≈ $${spent.toFixed(2)}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
