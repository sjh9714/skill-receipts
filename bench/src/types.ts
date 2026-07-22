// Shared data model for the benchmark harness.

// The three arms of a receipt (the admission rule compares "on" against both controls):
//  - "on": the skill's shipped snippet, injected byte-identically
//  - "off": no instructions
//  - "placebo": style-only instructions of comparable length (instruction-presence confound)
//  - "vs-<name>": a vendored third-party ruleset from bench/competitors/<name>.md,
//    run under the identical protocol (head-to-head audit arm; not part of admission)
export type Condition = "on" | "off" | "placebo" | `vs-${string}`;

export interface Trap {
  name: string;
  detect:
    | { type: "regex"; pattern: string; glob: string }
    | { type: "deps-added" }
    | { type: "exports-gt"; max: number }
    // brownfield: fires when a changed non-test file matches none of `allow`
    | { type: "touches-outside"; allow: string[] };
}

export interface Task {
  id: string;
  title: string;
  tags: string[];
  timeoutMin: number;
  maxBudgetUsd: number; // per-run spend cap (CLI --max-budget-usd; --max-turns is gone)
  traps: Trap[];
}

// Everything measured for a single (skill, task, condition, trial) run.
export interface RunResult {
  runId: string;
  skillId: string;
  taskId: string;
  condition: Condition;
  trial: number;
  model: string;
  cliVersion: string;
  ranAt: string; // ISO date, stamped by the runner after the run

  // accuracy — the primary gate
  accepted: boolean;
  failingTests: string[];

  // optional task-defined scalar receipt metric (e.g. mutant kill rate):
  // acceptance writes a number to .bench-scalar in the workspace; null when absent
  taskScalar: number | null;

  // scope metrics
  locAddedSrc: number;
  locAddedTest: number;
  filesCreated: number;
  depsAdded: string[];
  exportedSymbols: number;
  trapsTriggered: string[];

  // cost/effort, read from the CLI's own JSON
  numTurns: number;
  totalCostUsd: number;
  durationMs: number;
}
