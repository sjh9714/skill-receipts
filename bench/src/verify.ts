import { execFile, execFileSync } from "node:child_process";
import { cp, mkdir, readFile, rm, symlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { promisify } from "node:util";

const execFileP = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const isTestFile = (p: string) =>
  /(^|\/)(test|tests|__tests__)\//.test(p) || /\.(test|spec)\.[cm]?[jt]sx?$/.test(p);

async function runVitest(cwd: string, files: string[]): Promise<{ success: boolean; assertionFailure: boolean }> {
  const report = path.join(cwd, ".repro-report.json");
  try {
    await execFileP("npx", ["vitest", "run", ...files, "--reporter=json", `--outputFile=${report}`], {
      cwd,
      timeout: 120_000,
    });
  } catch {
    // non-zero exit expected for failing suites
  }
  try {
    const parsed = JSON.parse(await readFile(report, "utf8"));
    await rm(report, { force: true });
    let assertionFailure = false;
    for (const suite of parsed.testResults ?? []) {
      for (const test of suite.assertionResults ?? []) {
        if (test.status !== "passed") {
          const messages = (test.failureMessages ?? []).join("\n");
          if (!/Cannot find (module|package)|ERR_MODULE_NOT_FOUND/.test(messages)) assertionFailure = true;
        }
      }
    }
    return { success: parsed.success === true, assertionFailure };
  } catch {
    return { success: false, assertionFailure: false };
  }
}

// The repro-verified detector: did the agent add test files that FAIL on the
// pre-fix baseline commit (with an assertion failure, not an import error)
// and pass on the final tree? Runs after verifyAcceptance so node_modules is
// installed. Uses a git worktree of the baseline commit (D5 machinery).
export async function verifyRepro(dir: string): Promise<boolean> {
  const git = (...args: string[]) =>
    execFileSync("git", ["-C", dir, ...args], { encoding: "utf8" });
  // node_modules (installed by verifyAcceptance) and the injected acceptance/
  // suite are not the agent's work — only its own added test files count
  git("add", "-A", "--", ".", ":!node_modules", ":!acceptance");
  const addedTests = git("diff", "--cached", "HEAD", "--name-status")
    .split("\n")
    .filter((l) => l.startsWith("A\t"))
    .map((l) => l.split("\t")[1])
    .filter(
      (p) =>
        isTestFile(p) &&
        !p.startsWith("node_modules/") &&
        !p.startsWith("acceptance/") &&
        p !== "package-lock.json",
    );
  if (addedTests.length === 0) return false;

  // final tree first — before the worktree exists, so vitest's path filters
  // cannot match the baseline copies of the same files
  const onFinal = await runVitest(dir, addedTests);
  if (!onFinal.success) return false;

  const baseline = path.join(dir, ".baseline-check");
  try {
    git("worktree", "add", baseline, "HEAD");
    await symlink(path.join(dir, "node_modules"), path.join(baseline, "node_modules"));
    for (const file of addedTests) {
      await mkdir(path.dirname(path.join(baseline, file)), { recursive: true });
      await cp(path.join(dir, file), path.join(baseline, file));
    }
    const onBaseline = await runVitest(baseline, addedTests);
    return !onBaseline.success && onBaseline.assertionFailure;
  } finally {
    try {
      git("worktree", "remove", "--force", baseline);
    } catch {
      await rm(baseline, { recursive: true, force: true });
    }
  }
}

// Run the hold-out acceptance tests against a finished workspace — the primary
// accuracy gate (D2). A run that fails here is a FAIL regardless of how little
// code it wrote. The agent never saw these tests; they are copied in here,
// after the run. Acceptance may additionally write a single number to
// .bench-scalar (e.g. a mutant kill rate) — the task-defined receipt metric.
export async function verifyAcceptance(
  dir: string,
  skillId: string,
  taskId: string,
): Promise<{ accepted: boolean; failingTests: string[]; taskScalar: number | null }> {
  await cp(
    path.join(root, "skills", skillId, "tasks", taskId, "acceptance"),
    path.join(dir, "acceptance"),
    { recursive: true },
  );
  const report = path.join(dir, ".vitest-report.json");
  try {
    await execFileP("npm", ["install", "--no-audit", "--no-fund", "--prefer-offline"], {
      cwd: dir,
      timeout: 240_000,
    });
    await execFileP(
      "npx",
      ["vitest", "run", "acceptance", "--reporter=json", `--outputFile=${report}`],
      { cwd: dir, timeout: 240_000 },
    );
  } catch {
    // vitest exits non-zero on failing tests; the report tells us what failed
  }
  let taskScalar: number | null = null;
  try {
    const raw = (await readFile(path.join(dir, ".bench-scalar"), "utf8")).trim();
    const parsed = Number(raw);
    if (Number.isFinite(parsed)) taskScalar = parsed;
  } catch {
    // task does not define a scalar metric
  }
  try {
    const parsed = JSON.parse(await readFile(report, "utf8"));
    await rm(report, { force: true });
    const failingTests: string[] = [];
    for (const suite of parsed.testResults ?? []) {
      for (const test of suite.assertionResults ?? []) {
        if (test.status !== "passed") failingTests.push(test.fullName);
      }
    }
    return { accepted: parsed.success === true, failingTests, taskScalar };
  } catch {
    // no report at all: install failed or the suite could not even be collected
    return { accepted: false, failingTests: ["<test run produced no report>"], taskScalar };
  }
}
