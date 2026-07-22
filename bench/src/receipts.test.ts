import { describe, expect, it } from "vitest";
import { buildReceipt, renderReceipts, splice } from "./receipts.js";
import type { RunResult } from "./types.js";

describe("splice", () => {
  const readme = "intro\n<!-- BENCH:START -->\nold\n<!-- BENCH:END -->\noutro";

  it("replaces only the content between the sentinels", () => {
    expect(splice(readme, "NEW")).toBe("intro\n<!-- BENCH:START -->\nNEW\n<!-- BENCH:END -->\noutro");
  });

  it("is idempotent", () => {
    expect(splice(splice(readme, "NEW"), "NEW")).toBe(splice(readme, "NEW"));
  });

  it("throws when sentinels are missing", () => {
    expect(() => splice("no markers", "NEW")).toThrow(/BENCH:START/);
  });
});

function run(partial: Partial<RunResult>): RunResult {
  return {
    runId: "x",
    skillId: "s",
    taskId: "t",
    condition: "off",
    trial: 1,
    model: "claude-opus-4-8",
    cliVersion: "2.1.216 (Claude Code)",
    ranAt: "2026-07-22T00:00:00Z",
    accepted: true,
    failingTests: [],
    taskScalar: null,
    reproVerified: null,
    locAddedSrc: 0,
    locAddedTest: 0,
    filesCreated: 0,
    depsAdded: [],
    exportedSymbols: 0,
    trapsTriggered: [],
    numTurns: 1,
    totalCostUsd: 0.1,
    durationMs: 1000,
    ...partial,
  };
}

const TARGET = { metric: "locAddedSrc", direction: "down", label: "src LOC added" } as const;

// task a: off [40,42,44]→42, placebo [36,38,40]→38, on [18,20,22]→20
function threeArm(overrides: { onLoc?: number[]; onAccepted?: boolean[] } = {}): RunResult[] {
  const onLoc = overrides.onLoc ?? [18, 20, 22];
  const onAcc = overrides.onAccepted ?? [true, true, true];
  return [
    ...[40, 42, 44].map((loc, i) => run({ runId: `s--a-off-t${i + 1}`, taskId: "a", condition: "off", trial: i + 1, locAddedSrc: loc })),
    ...[36, 38, 40].map((loc, i) => run({ runId: `s--a-placebo-t${i + 1}`, taskId: "a", condition: "placebo", trial: i + 1, locAddedSrc: loc })),
    ...onLoc.map((loc, i) => run({ runId: `s--a-on-t${i + 1}`, taskId: "a", condition: "on", trial: i + 1, locAddedSrc: loc, accepted: onAcc[i] ?? true })),
  ];
}

describe("buildReceipt", () => {
  it("computes per-task three-arm medians and pass counts", () => {
    const r = buildReceipt("s", TARGET, threeArm());
    expect(r.rows).toEqual([
      { taskId: "a", trials: 3, off: 42, placebo: 38, on: 20, passOff: 3, passPlacebo: 3, passOn: 3 },
    ]);
    expect(r.medianTarget).toEqual({ off: 42, placebo: 38, on: 20 });
    expect(r.deltaVsOffPct).toBe(-52.4);
    expect(r.deltaVsPlaceboPct).toBe(-47.4);
  });

  it("admits a skill that beats both arms without dropping accuracy", () => {
    const r = buildReceipt("s", TARGET, threeArm());
    expect(r.admitted).toBe(true);
    expect(r.reasons).toEqual([]);
  });

  it("rejects a skill that beats off but not placebo", () => {
    const r = buildReceipt("s", TARGET, threeArm({ onLoc: [39, 40, 41] }));
    expect(r.admitted).toBe(false);
    expect(r.reasons).toEqual(["does not beat placebo on src LOC added (40 vs 38)"]);
  });

  it("rejects a skill whose accuracy drops, even when the target improves", () => {
    const r = buildReceipt("s", TARGET, threeArm({ onAccepted: [true, false, true] }));
    expect(r.admitted).toBe(false);
    expect(r.reasons).toEqual(["acceptance pass rate drops vs off (2/3 vs 3/3)", "acceptance pass rate drops vs placebo (2/3 vs 3/3)"]);
  });

  it("respects direction=up targets", () => {
    const up = { metric: "locAddedTest", direction: "up", label: "test LOC added" } as const;
    const runs = [
      run({ runId: "o1", taskId: "a", condition: "off", locAddedTest: 5 }),
      run({ runId: "p1", taskId: "a", condition: "placebo", locAddedTest: 6 }),
      run({ runId: "n1", taskId: "a", condition: "on", locAddedTest: 12 }),
    ];
    const r = buildReceipt("s", up, runs);
    expect(r.admitted).toBe(true);
    expect(r.deltaVsOffPct).toBe(140);
  });

  it("supports the task-defined scalar metric (e.g. mutant kill rate)", () => {
    const kill = { metric: "taskScalar", direction: "up", label: "mutant kill rate" } as const;
    const runs = [
      run({ runId: "o1", taskId: "a", condition: "off", taskScalar: 0.4 }),
      run({ runId: "p1", taskId: "a", condition: "placebo", taskScalar: 0.5 }),
      run({ runId: "n1", taskId: "a", condition: "on", taskScalar: 0.9 }),
    ];
    const r = buildReceipt("s", kill, runs);
    expect(r.admitted).toBe(true);
    expect(r.medianTarget).toEqual({ off: 0.4, placebo: 0.5, on: 0.9 });
  });

  it("renders binary metrics as run-level counts with the admission note", () => {
    const spec = { metric: "reproVerified", direction: "up", label: "verified-repro rate" } as const;
    const runs = [
      run({ runId: "o1", taskId: "a", condition: "off", reproVerified: false }),
      run({ runId: "p1", taskId: "a", condition: "placebo", reproVerified: false }),
      run({ runId: "n1", taskId: "a", condition: "on", reproVerified: true }),
    ];
    const r = buildReceipt("s", spec, runs, undefined, "compliance fallback note");
    expect(r.binaryCounts).toEqual({ off: "0/1", placebo: "0/1", on: "1/1" });
    const md = renderReceipts([r]);
    expect(md).toContain("on 1/1 runs vs off 0/1 vs placebo 0/1");
    expect(md).toContain("> compliance fallback note");
    expect(md).not.toContain("n/a vs baseline");
  });

  it("throws when a run is missing the scalar the target requires", () => {
    const kill = { metric: "taskScalar", direction: "up", label: "mutant kill rate" } as const;
    expect(() => buildReceipt("s", kill, [run({ taskScalar: null })])).toThrow(/\.bench-scalar/);
  });

  it("enforces a co-primary target when the skill declares one", () => {
    // on beats off+placebo on cost, but ties placebo on turns -> rejected
    const cost = { metric: "totalCostUsd", direction: "down", label: "cost per run" } as const;
    const turns = { metric: "numTurns", direction: "down", label: "turns per run" } as const;
    const runs = [
      run({ runId: "o1", taskId: "a", condition: "off", totalCostUsd: 0.4, numTurns: 30 }),
      run({ runId: "p1", taskId: "a", condition: "placebo", totalCostUsd: 0.38, numTurns: 24 }),
      run({ runId: "n1", taskId: "a", condition: "on", totalCostUsd: 0.2, numTurns: 24 }),
    ];
    const rejected = buildReceipt("s", cost, runs, turns);
    expect(rejected.admitted).toBe(false);
    expect(rejected.reasons).toEqual(["does not beat placebo on turns per run (24 vs 24)"]);
    const admitted = buildReceipt(
      "s",
      cost,
      runs.map((r) => (r.condition === "on" ? { ...r, numTurns: 20 } : r)),
      turns,
    );
    expect(admitted.admitted).toBe(true);
  });

  it("excludes vs-* comparison arms from the admission decision but reports them", () => {
    const runs = [
      ...threeArm(),
      run({ runId: "v1", taskId: "a", condition: "vs-caveman", locAddedSrc: 30, accepted: true }),
      run({ runId: "v2", taskId: "a", condition: "vs-caveman", locAddedSrc: 32, accepted: false }),
    ];
    const r = buildReceipt("s", TARGET, runs);
    expect(r.rows).toHaveLength(1);
    expect(r.medianTarget).toEqual({ off: 42, placebo: 38, on: 20 });
    expect(r.admitted).toBe(true);
    expect(r.runsTotal).toBe(9);
    expect(r.comparisons).toEqual([
      { name: "caveman", runs: 2, medianTarget: 31, passRate: "1/2" },
    ]);
  });

  it("renders comparison arms under the skill section", () => {
    const runs = [
      ...threeArm(),
      run({ runId: "v1", taskId: "a", condition: "vs-caveman", locAddedSrc: 30 }),
    ];
    const md = renderReceipts([buildReceipt("s", TARGET, runs)]);
    expect(md).toContain("vs-caveman");
    expect(md).toContain("not part of admission");
  });
});

describe("renderReceipts", () => {
  const admitted = buildReceipt("underkill", TARGET, threeArm());
  const rejected = buildReceipt("padder", TARGET, threeArm({ onLoc: [50, 52, 54] }));
  const md = renderReceipts([admitted, rejected]);

  it("renders admitted skills with their three-arm table", () => {
    expect(md).toContain("underkill");
    expect(md).toContain("42");
    expect(md).toContain("38");
    expect(md).toContain("20");
    expect(md).toContain("-52.4%");
    expect(md).toContain("claude-opus-4-8");
  });

  it("renders rejected skills with reasons AND their full three-arm table", () => {
    expect(md).toContain("Did not make the cut");
    expect(md).toContain("❌ padder — rejected:");
    expect(md).toMatch(/does not beat (baseline|placebo)/);
    expect(md).toContain("| task | off | placebo | on (padder) |");
  });

  it("is deterministic", () => {
    expect(md).toBe(renderReceipts([admitted, rejected]));
  });
});
