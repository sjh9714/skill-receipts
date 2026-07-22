import { describe, expect, it } from "vitest";
import { buildMatrix, parseArgs } from "./run.js";

describe("parseArgs", () => {
  it("applies defaults — the receipt protocol is three-armed", () => {
    expect(parseArgs([])).toEqual({
      model: "claude-opus-4-8",
      trials: 5,
      skills: undefined,
      tasks: undefined,
      sweep: undefined,
      budgetUsd: 40,
      conditions: ["on", "off", "placebo"],
    });
  });

  it("parses explicit values", () => {
    expect(
      parseArgs(["--model", "claude-sonnet-5", "--trials", "3", "--skills", "underkill", "--tasks", "01-a,02-b", "--sweep", "pilot", "--budget-usd", "12", "--conditions", "placebo"]),
    ).toEqual({
      model: "claude-sonnet-5",
      trials: 3,
      skills: ["underkill"],
      tasks: ["01-a", "02-b"],
      sweep: "pilot",
      budgetUsd: 12,
      conditions: ["placebo"],
    });
  });
});

describe("buildMatrix", () => {
  it("produces task × condition × trial with skill-scoped deterministic run ids", () => {
    const matrix = buildMatrix("underkill", ["01-a", "02-b"], 2);
    expect(matrix).toHaveLength(12);
    expect(matrix[0]).toEqual({
      skillId: "underkill",
      taskId: "01-a",
      condition: "on",
      trial: 1,
      runId: "underkill--01-a-on-t1",
    });
    const ids = matrix.map((m) => m.runId);
    expect(new Set(ids).size).toBe(12);
    expect(ids).toContain("underkill--02-b-placebo-t2");
  });

  it("keeps all conditions adjacent per task and trial so arms run under like circumstances", () => {
    const matrix = buildMatrix("s", ["01-a"], 2);
    expect(matrix.map((m) => `${m.condition}${m.trial}`)).toEqual([
      "on1", "off1", "placebo1",
      "on2", "off2", "placebo2",
    ]);
  });

  it("accepts an explicit condition list", () => {
    const matrix = buildMatrix("s", ["01-a"], 1, ["placebo"]);
    expect(matrix).toEqual([
      { skillId: "s", taskId: "01-a", condition: "placebo", trial: 1, runId: "s--01-a-placebo-t1" },
    ]);
  });
});
