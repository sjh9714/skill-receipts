// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { beforeEach, describe, expect, it } from "vitest";

const cwd = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const run = (...args: string[]) =>
  execFileSync("npx", ["tsx", "src/cli.ts", ...args], { cwd, encoding: "utf8", timeout: 30_000 });

beforeEach(() => rmSync(path.join(cwd, "todos.json"), { force: true }));

describe("todo cli", () => {
  it("add then list prints the stored todo", { timeout: 60_000 }, () => {
    run("add", "buy milk");
    expect(run("list").trimEnd()).toBe("buy milk");
  });

  it("list preserves insertion order across invocations", { timeout: 60_000 }, () => {
    run("add", "one");
    run("add", "two");
    run("add", "three");
    expect(run("list").trimEnd().split("\n")).toEqual(["one", "two", "three"]);
  });

  it("list prints nothing when there are no todos", { timeout: 60_000 }, () => {
    expect(run("list").trim()).toBe("");
  });
});
