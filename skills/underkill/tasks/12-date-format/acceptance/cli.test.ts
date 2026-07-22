// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { describe, expect, it } from "vitest";

const cwd = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const run = (iso: string): string =>
  execFileSync("npx", ["tsx", "src/cli.ts", iso], { cwd, encoding: "utf8", timeout: 30_000 }).trimEnd();

describe("date format cli", () => {
  it("formats an afternoon timestamp", { timeout: 60_000 }, () => {
    expect(run("2026-07-22T09:15:00Z")).toBe("2026-07-22 09:15");
  });

  it("pads single-digit fields", { timeout: 60_000 }, () => {
    expect(run("2026-03-04T05:06:00Z")).toBe("2026-03-04 05:06");
  });

  it("formats midnight minutes", { timeout: 60_000 }, () => {
    expect(run("2026-01-05T00:07:59Z")).toBe("2026-01-05 00:07");
  });
});
