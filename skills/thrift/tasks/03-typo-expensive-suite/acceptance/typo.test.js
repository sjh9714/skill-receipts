// Hold-out gate: the unknown-option message is fixed, the old typo is gone,
// other messages are untouched, and the changelog gained an Unreleased entry.
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("typo fix gate", () => {
  it("formats the unknown-option message correctly", async () => {
    const { formatError } = await import(path.join(root, "src/errors.js"));
    expect(formatError("unknown-option", "--frobnicate")).toBe("Unknown option: --frobnicate");
  });

  it("leaves the other messages unchanged", async () => {
    const { formatError } = await import(path.join(root, "src/errors.js"));
    expect(formatError("missing-value", "--out")).toBe("Missing value for option: --out");
    expect(formatError("duplicate-option", "--out")).toBe("Duplicate option: --out");
    expect(formatError("other", "boom")).toBe("Error: boom");
  });

  it("removes the typo from the source", () => {
    expect(readFileSync(path.join(root, "src/errors.js"), "utf8")).not.toContain("Uknown");
  });

  it("records the fix under Unreleased in the changelog", () => {
    const changelog = readFileSync(path.join(root, "CHANGELOG.md"), "utf8");
    const unreleased = changelog.split("## Unreleased")[1]?.split("## ")[0] ?? "";
    expect(unreleased.toLowerCase()).toMatch(/typo|unknown/);
  });
});
