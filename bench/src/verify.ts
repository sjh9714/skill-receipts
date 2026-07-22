import { execFile } from "node:child_process";
import { cp, readFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { promisify } from "node:util";

const execFileP = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// Run the hold-out acceptance tests against a finished workspace — the primary
// accuracy gate (D2). A run that fails here is a FAIL regardless of how little
// code it wrote. The agent never saw these tests; they are copied in here,
// after the run.
export async function verifyAcceptance(
  dir: string,
  skillId: string,
  taskId: string,
): Promise<{ accepted: boolean; failingTests: string[] }> {
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
  try {
    const parsed = JSON.parse(await readFile(report, "utf8"));
    await rm(report, { force: true });
    const failingTests: string[] = [];
    for (const suite of parsed.testResults ?? []) {
      for (const test of suite.assertionResults ?? []) {
        if (test.status !== "passed") failingTests.push(test.fullName);
      }
    }
    return { accepted: parsed.success === true, failingTests };
  } catch {
    // no report at all: install failed or the suite could not even be collected
    return { accepted: false, failingTests: ["<test run produced no report>"] };
  }
}
