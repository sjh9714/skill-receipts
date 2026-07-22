// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import { execFileSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const cwd = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixture = path.join(cwd, "sample.csv");

const summarize = (content: string): string => {
  writeFileSync(fixture, content);
  return execFileSync("npx", ["tsx", "src/cli.ts", "sample.csv"], {
    cwd,
    encoding: "utf8",
    timeout: 30_000,
  }).trimEnd();
};

afterEach(() => rmSync(fixture, { force: true }));

describe("csv summarize cli", () => {
  it("counts data rows and header columns", { timeout: 60_000 }, () => {
    expect(summarize("a,b,c\n1,2,3\n4,5,6\n")).toBe("rows: 2\ncols: 3");
  });

  it("reports zero rows for a header-only file", { timeout: 60_000 }, () => {
    expect(summarize("id,name\n")).toBe("rows: 0\ncols: 2");
  });

  it("handles a missing trailing newline", { timeout: 60_000 }, () => {
    expect(summarize("x,y\n7,8")).toBe("rows: 1\ncols: 2");
  });
});
