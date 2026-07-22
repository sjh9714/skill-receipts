import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { collectMetrics, stripComments } from "./metrics.js";
import type { Task } from "./types.js";

describe("stripComments", () => {
  it("removes line and block comments but keeps code", () => {
    const src = `const a = 1; // exponential backoff\n/* Strategy\n pattern */\nconst b = 2;\n`;
    const out = stripComments(src);
    expect(out).toContain("const a = 1;");
    expect(out).toContain("const b = 2;");
    expect(out).not.toContain("exponential");
    expect(out).not.toContain("Strategy");
  });
});

const task: Task = {
  id: "fixture",
  title: "fixture",
  tags: [],
  timeoutMin: 1,
  maxBudgetUsd: 1,
  traps: [
    { name: "comment-only", detect: { type: "regex", pattern: "Strategy", glob: "src/**/*.ts" } },
    { name: "in-code", detect: { type: "regex", pattern: "fetchWithRetry\\s*\\(", glob: "src/**/*.ts" } },
    { name: "new-dependency", detect: { type: "deps-added" } },
    { name: "extra-exports", detect: { type: "exports-gt", max: 1 } },
  ],
};

function git(dir: string, ...args: string[]): void {
  execFileSync("git", ["-C", dir, ...args], { stdio: "ignore" });
}

describe("collectMetrics", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "metrics-fixture-"));
  afterAll(() => rmSync(dir, { recursive: true, force: true }));

  // baseline
  mkdirSync(path.join(dir, "src"), { recursive: true });
  writeFileSync(path.join(dir, ".gitignore"), "node_modules/\n");
  writeFileSync(path.join(dir, "package.json"), JSON.stringify({ name: "fx", dependencies: {} }));
  writeFileSync(path.join(dir, "src/index.ts"), "export {};\n");
  git(dir, "init", "-q", "-b", "main");
  git(dir, "add", "-A");
  git(dir, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "baseline");

  // simulated agent output
  writeFileSync(
    path.join(dir, "src/index.ts"),
    "// Strategy mentioned only in a comment\nexport function fetchWithRetry(url: string): string {\n  return url;\n}\n",
  );
  writeFileSync(path.join(dir, "src/util.ts"), "export const a = 1;\nexport const b = 2;\n");
  writeFileSync(path.join(dir, "src/index.test.ts"), "import {} from 'vitest';\n// t\n// t\n// t\n");
  writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify({ name: "fx", dependencies: { "left-pad": "^1.0.0" } }),
  );
  mkdirSync(path.join(dir, "node_modules/junk"), { recursive: true });
  writeFileSync(path.join(dir, "node_modules/junk/index.js"), "x\n");

  it("splits added LOC into src vs test and ignores node_modules", async () => {
    const m = await collectMetrics(dir, task);
    expect(m.locAddedSrc).toBe(6); // 4 in index.ts + 2 in util.ts
    expect(m.locAddedTest).toBe(4);
  });

  it("counts created files, added deps, exported symbols", async () => {
    const m = await collectMetrics(dir, task);
    expect(m.filesCreated).toBe(2); // util.ts + index.test.ts (package.json is modified)
    expect(m.depsAdded).toEqual(["left-pad"]);
    expect(m.exportedSymbols).toBe(3); // fetchWithRetry, a, b — test files excluded
  });

  it("fires traps on code, deps, and export count — but not on comments", async () => {
    const m = await collectMetrics(dir, task);
    expect(m.trapsTriggered).toEqual(["in-code", "new-dependency", "extra-exports"]);
  });

  it("touches-outside fires when non-test files outside the allowed globs changed", async () => {
    const scoped: Task = {
      ...task,
      traps: [{ name: "unrelated-changes", detect: { type: "touches-outside", allow: ["src/index.ts"] } }],
    };
    // src/util.ts and package.json changed and are outside the allow list
    const m = await collectMetrics(dir, scoped);
    expect(m.trapsTriggered).toEqual(["unrelated-changes"]);
  });

  it("touches-outside ignores agent-written test files", async () => {
    const scoped: Task = {
      ...task,
      traps: [
        {
          name: "unrelated-changes",
          detect: { type: "touches-outside", allow: ["src/index.ts", "src/util.ts", "package.json"] },
        },
      ],
    };
    // the only remaining changed file is src/index.test.ts — exempt by design:
    // writing tests is never counted as out-of-scope (test LOC is tracked separately)
    const m = await collectMetrics(dir, scoped);
    expect(m.trapsTriggered).toEqual([]);
  });
});
