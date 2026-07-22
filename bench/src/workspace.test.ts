import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { prepareWorkspace } from "./workspace.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const created: string[] = [];

afterAll(() => {
  for (const dir of created) rmSync(dir, { recursive: true, force: true });
});

async function prepare(condition: "on" | "off" | "placebo") {
  const ws = await prepareWorkspace("underkill", "01-fetch-retry", condition);
  created.push(ws.dir, ws.configDir);
  return ws;
}

describe("prepareWorkspace", () => {
  it("copies the skill's task template and commits a clean git baseline", async () => {
    const { dir } = await prepare("off");
    expect(existsSync(path.join(dir, "src/index.ts"))).toBe(true);
    expect(existsSync(path.join(dir, "package.json"))).toBe(true);
    const status = execFileSync("git", ["-C", dir, "status", "--porcelain"], { encoding: "utf8" });
    expect(status.trim()).toBe("");
    const log = execFileSync("git", ["-C", dir, "log", "--oneline"], { encoding: "utf8" });
    expect(log.trim().split("\n")).toHaveLength(1);
  });

  it("off: writes no CLAUDE.md", async () => {
    const { dir } = await prepare("off");
    expect(existsSync(path.join(dir, "CLAUDE.md"))).toBe(false);
  });

  it("on: writes CLAUDE.md byte-identical to the skill's shipped snippet, inside the baseline", async () => {
    const { dir } = await prepare("on");
    const snippet = readFileSync(
      path.join(root, "skills/underkill/dist/CLAUDE.md.snippet"),
      "utf8",
    );
    expect(readFileSync(path.join(dir, "CLAUDE.md"), "utf8")).toBe(snippet);
    const status = execFileSync("git", ["-C", dir, "status", "--porcelain"], { encoding: "utf8" });
    expect(status.trim()).toBe("");
  });

  it("placebo: injects the placebo instructions with the meta comment stripped", async () => {
    const { dir } = await prepare("placebo");
    const content = readFileSync(path.join(dir, "CLAUDE.md"), "utf8");
    expect(content.length).toBeGreaterThan(100);
    // the file's editor-facing comment describes the experiment and must never reach the model
    expect(content).not.toContain("<!--");
    expect(content.toLowerCase()).not.toContain("placebo");
    expect(content.toLowerCase()).not.toContain("scope");
  });

  it("gives every run its own empty scratch config dir", async () => {
    const a = await prepare("off");
    const b = await prepare("off");
    expect(a.configDir).not.toBe(b.configDir);
    expect(existsSync(a.configDir)).toBe(true);
  });
});
