// Hold-out gate for a test-writing task. The agent's job was to write test/,
// not to touch src/. This gate verifies (1) src is untouched, (2) the suite
// passes on the pristine module with >=3 tests, (3) the suite also passes on a
// behavior-preserving refactor (implementation-coupled suites fail here).
// Separately it runs the suite against each pre-registered mutant and writes
// the kill rate to .bench-scalar — the receipt metric, not part of this gate.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";

const root = process.cwd();
const SRC = path.join(root, "src/limiter.js");
const EXPECTED_SHA = "fe420a2c8269bfd8951539b01eb45b09efc0ccf5f2e7816aba72423bf6cd5be7";
const original = readFileSync(SRC);

function runSuite() {
  const out = path.join(root, ".inner-report.json");
  rmSync(out, { force: true });
  let spawned = true;
  try {
    execFileSync(
      "npx",
      ["vitest", "run", "--dir", "test", "--reporter=json", `--outputFile=${out}`],
      { cwd: root, stdio: "ignore", timeout: 90_000 },
    );
  } catch {
    spawned = false; // non-zero exit: failing tests (or no tests)
  }
  let total = 0;
  let success = false;
  try {
    const report = JSON.parse(readFileSync(out, "utf8"));
    total = report.numTotalTests ?? 0;
    success = report.success === true;
  } catch {}
  rmSync(out, { force: true });
  return { pass: spawned && success, total };
}

afterAll(() => {
  writeFileSync(SRC, original);
});

describe("gate", () => {
  it("src/limiter.js is untouched", () => {
    expect(createHash("sha256").update(readFileSync(SRC)).digest("hex")).toBe(EXPECTED_SHA);
  });

  it("the suite passes on the pristine module with at least 3 tests", () => {
    const { pass, total } = runSuite();
    expect(pass).toBe(true);
    expect(total).toBeGreaterThanOrEqual(3);
  });

  it("the suite passes on a behavior-preserving refactor", () => {
    copyFileSync(path.join(root, "acceptance/variants/refactor.js"), SRC);
    try {
      expect(runSuite().pass).toBe(true);
    } finally {
      writeFileSync(SRC, original);
    }
  });

  it("kill rate is measured against every pre-registered mutant", () => {
    const mutantsDir = path.join(root, "acceptance/mutants");
    const mutants = readdirSync(mutantsDir).filter((f) => f.endsWith(".js")).sort();
    expect(mutants.length).toBeGreaterThan(0);
    let killed = 0;
    for (const mutant of mutants) {
      copyFileSync(path.join(mutantsDir, mutant), SRC);
      try {
        if (!runSuite().pass) killed++;
      } finally {
        writeFileSync(SRC, original);
      }
    }
    writeFileSync(path.join(root, ".bench-scalar"), String(killed / mutants.length));
  });
});
