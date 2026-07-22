import { execFile, spawn } from "node:child_process";
import { appendFile, chmod, copyFile, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import type { Task } from "./types.js";

const execFileP = promisify(execFile);

// Verified against @anthropic-ai/claude-code 2.1.216: --max-turns no longer
// exists; --max-budget-usd caps spend per run instead (a better guardrail
// anyway). Re-verify with `claude --help` when bumping the pinned CLI version.
const ALLOWED_TOOLS = "Write,Edit,Read,Glob,Grep,Bash(npm:*),Bash(node:*),Bash(npx:*)";

export function buildArgs(opts: { model: string; maxBudgetUsd: number; prompt: string }): string[] {
  return [
    "-p",
    "--model", opts.model,
    "--output-format", "stream-json",
    "--verbose",
    "--permission-mode", "acceptEdits",
    "--allowedTools", ALLOWED_TOOLS,
    "--max-budget-usd", String(opts.maxBudgetUsd),
    opts.prompt,
  ];
}

// The isolated CLAUDE_CONFIG_DIR must still authenticate. Only account
// identity and onboarding state cross the boundary — never settings, skills,
// MCP servers, or CLAUDE.md (design decision D5).
export function buildMinimalConfig(fullConfigJson: string | undefined): Record<string, unknown> {
  let src: Record<string, unknown> = {};
  try {
    src = JSON.parse(fullConfigJson ?? "");
  } catch {}
  const out: Record<string, unknown> = { hasCompletedOnboarding: true };
  for (const key of ["oauthAccount", "userID", "hasCompletedOnboarding"]) {
    if (key in src) out[key] = src[key];
  }
  return out;
}

export async function seedConfigAuth(configDir: string): Promise<void> {
  let fullConfig: string | undefined;
  try {
    fullConfig = await readFile(path.join(os.homedir(), ".claude.json"), "utf8");
  } catch {}
  await writeFile(
    path.join(configDir, ".claude.json"),
    JSON.stringify(buildMinimalConfig(fullConfig)),
  );

  const credentials = path.join(configDir, ".credentials.json");
  try {
    await copyFile(path.join(os.homedir(), ".claude/.credentials.json"), credentials);
  } catch {
    if (process.platform === "darwin") {
      // with a custom CLAUDE_CONFIG_DIR the CLI reads file credentials, not
      // the keychain — extract the token the CLI itself stored there
      const { stdout } = await execFileP("security", [
        "find-generic-password", "-s", "Claude Code-credentials", "-w",
      ]);
      await writeFile(credentials, stdout.trim());
      await chmod(credentials, 0o600);
    } else if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("no Claude Code credentials found and ANTHROPIC_API_KEY unset");
    }
  }
}

export function parseResultEvent(
  ndjson: string,
): { numTurns: number; totalCostUsd: number; durationMs: number } | null {
  for (const line of ndjson.trim().split("\n").reverse()) {
    try {
      const event = JSON.parse(line);
      if (event.type === "result") {
        return {
          numTurns: event.num_turns ?? 0,
          totalCostUsd: event.total_cost_usd ?? 0,
          durationMs: event.duration_ms ?? 0,
        };
      }
    } catch {}
  }
  return null;
}

// Env whitelist: the child must not inherit nested-Claude/session state.
function childEnv(configDir: string): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {
    CLAUDE_CONFIG_DIR: configDir,
    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1",
  };
  for (const key of ["PATH", "HOME", "SHELL", "TERM", "LANG", "LC_ALL", "TMPDIR", "ANTHROPIC_API_KEY"]) {
    if (process.env[key] !== undefined) env[key] = process.env[key];
  }
  return env;
}

export async function runAgent(opts: {
  runId: string;
  task: Task;
  dir: string;
  configDir: string;
  model: string;
  prompt: string;
  logDir: string;
}): Promise<{ numTurns: number; totalCostUsd: number; durationMs: number; logPath: string }> {
  await seedConfigAuth(opts.configDir);
  const logPath = path.join(opts.logDir, `${opts.runId}.ndjson`);
  const args = buildArgs({
    model: opts.model,
    maxBudgetUsd: opts.task.maxBudgetUsd,
    prompt: opts.prompt,
  });

  const started = Date.now();
  const stdout = await new Promise<string>((resolve, reject) => {
    const child = spawn("claude", args, {
      cwd: opts.dir,
      env: childEnv(opts.configDir),
      stdio: ["ignore", "pipe", "pipe"], // no stdin: skip the CLI's 3s stdin wait
    });
    let out = "";
    let err = "";
    child.stdout.on("data", (chunk: Buffer) => (out += chunk));
    child.stderr.on("data", (chunk: Buffer) => (err += chunk));
    const timer = setTimeout(() => child.kill("SIGKILL"), opts.task.timeoutMin * 60_000);
    child.on("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });
    child.on("close", () => {
      clearTimeout(timer);
      if (err.trim()) void appendFile(`${logPath}.stderr`, err).catch(() => {});
      resolve(out);
    });
  });
  await writeFile(logPath, stdout);

  const parsed = parseResultEvent(stdout);
  // no result event = timeout kill or hard crash; the run still gets scored
  // (it will fail the accuracy gate) but its cost is unknowable, so record 0
  return {
    ...(parsed ?? { numTurns: 0, totalCostUsd: 0, durationMs: Date.now() - started }),
    logPath,
  };
}
