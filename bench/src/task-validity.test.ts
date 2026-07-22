// Task-validity gate, run in CI (no API calls): for every skill's every task,
//  - reference/ passes the hold-out acceptance tests   (tests are satisfiable)
//  - the bare template fails them                      (tests are non-trivial)
//  - reference/ fires zero traps                       (no false positives)
//  - overbuilt/ fires every trap                       (no false negatives)
import { cp, readFile, readdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { collectMetrics } from "./metrics.js";
import { prepareWorkspace } from "./workspace.js";
import { verifyAcceptance } from "./verify.js";
import type { Task } from "./types.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillsDir = path.join(root, "skills");

async function listDirs(dir: string): Promise<string[]> {
  return (await readdir(dir, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

const cases: { skillId: string; taskId: string }[] = [];
for (const skillId of await listDirs(skillsDir)) {
  for (const taskId of await listDirs(path.join(skillsDir, skillId, "tasks"))) {
    cases.push({ skillId, taskId });
  }
}

const created: string[] = [];
afterAll(async () => {
  for (const dir of created) await rm(dir, { recursive: true, force: true });
});

async function workspaceWith(
  skillId: string,
  taskId: string,
  overlay?: "reference" | "overbuilt",
) {
  const ws = await prepareWorkspace(skillId, taskId, "off");
  created.push(ws.dir, ws.configDir);
  if (overlay) {
    await cp(path.join(skillsDir, skillId, "tasks", taskId, overlay), ws.dir, { recursive: true });
  }
  return ws.dir;
}

describe.each(cases)("$skillId/$taskId", ({ skillId, taskId }) => {
  const LONG = 240_000;

  it("reference passes the acceptance tests (and kills every mutant, when the task defines them)", { timeout: LONG }, async () => {
    const dir = await workspaceWith(skillId, taskId, "reference");
    const result = await verifyAcceptance(dir, skillId, taskId);
    expect(result.failingTests).toEqual([]);
    expect(result.accepted).toBe(true);
    // for scalar-metric tasks the reference suite must kill 100% of the
    // pre-registered mutants — proves no mutant is equivalent
    if (result.taskScalar !== null) expect(result.taskScalar).toBe(1);
  });

  it("bare template fails the acceptance tests", { timeout: LONG }, async () => {
    const dir = await workspaceWith(skillId, taskId);
    const result = await verifyAcceptance(dir, skillId, taskId);
    expect(result.accepted).toBe(false);
  });

  it("reference fires zero traps", { timeout: LONG }, async () => {
    const task: Task = JSON.parse(
      await readFile(path.join(skillsDir, skillId, "tasks", taskId, "task.json"), "utf8"),
    );
    const dir = await workspaceWith(skillId, taskId, "reference");
    const metrics = await collectMetrics(dir, task);
    expect(metrics.trapsTriggered).toEqual([]);
  });

  it("overbuilt fixture fires every trap", { timeout: LONG }, async () => {
    const task: Task = JSON.parse(
      await readFile(path.join(skillsDir, skillId, "tasks", taskId, "task.json"), "utf8"),
    );
    const dir = await workspaceWith(skillId, taskId, "overbuilt");
    const metrics = await collectMetrics(dir, task);
    expect(metrics.trapsTriggered).toEqual(task.traps.map((t) => t.name));
  });
});
