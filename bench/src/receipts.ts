// Build and render skill receipts: the three-arm (off / placebo / on)
// aggregation and the admission verdict defined by the pre-registered rule in
// README.md — the target metric must beat BOTH controls and the hold-out
// acceptance pass rate must not drop. Rejected skills render publicly in the
// "Did not make the cut" table. Regeneration is deterministic; CI verifies the
// README reproduces byte-identically from the raw logs.
import { readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { median } from "./stats.js";
import type { Condition, RunResult } from "./types.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export interface TargetSpec {
  metric: "locAddedSrc" | "locAddedTest" | "filesCreated" | "exportedSymbols" | "numTurns" | "durationMs" | "totalCostUsd";
  direction: "down" | "up";
  label: string;
}

export interface TaskReceiptRow {
  taskId: string;
  trials: number;
  off: number;
  placebo: number;
  on: number;
  passOff: number;
  passPlacebo: number;
  passOn: number;
}

export interface SkillReceipt {
  skillId: string;
  target: TargetSpec;
  model: string;
  cliVersion: string;
  runsTotal: number;
  totalCostUsd: number;
  rows: TaskReceiptRow[];
  medianTarget: { off: number; placebo: number; on: number };
  deltaVsOffPct: number | null;
  deltaVsPlaceboPct: number | null;
  passRate: { off: string; placebo: string; on: string }; // "accepted/total"
  admitted: boolean;
  reasons: string[];
}

const round1 = (x: number): number => Math.round(x * 10) / 10;
const deltaPct = (on: number, base: number): number | null =>
  base === 0 ? null : round1(((on - base) / base) * 100);

export function buildReceipt(skillId: string, target: TargetSpec, runs: RunResult[]): SkillReceipt {
  const arm = (c: Condition) => runs.filter((r) => r.condition === c);
  const taskIds = [...new Set(runs.map((r) => r.taskId))].sort();

  const rows: TaskReceiptRow[] = taskIds.map((taskId) => {
    const of = (c: Condition) => runs.filter((r) => r.taskId === taskId && r.condition === c);
    const med = (c: Condition) => median(of(c).map((r) => r[target.metric]));
    const pass = (c: Condition) => of(c).filter((r) => r.accepted).length;
    return {
      taskId,
      trials: of("off").length,
      off: med("off"),
      placebo: med("placebo"),
      on: med("on"),
      passOff: pass("off"),
      passPlacebo: pass("placebo"),
      passOn: pass("on"),
    };
  });

  const medianTarget = {
    off: median(rows.map((r) => r.off)),
    placebo: median(rows.map((r) => r.placebo)),
    on: median(rows.map((r) => r.on)),
  };

  const passCounts = (c: Condition) => {
    const a = arm(c);
    return { accepted: a.filter((r) => r.accepted).length, total: a.length };
  };
  const pc = { off: passCounts("off"), placebo: passCounts("placebo"), on: passCounts("on") };
  const rate = ({ accepted, total }: { accepted: number; total: number }) =>
    total === 0 ? 1 : accepted / total;
  const frac = ({ accepted, total }: { accepted: number; total: number }) => `${accepted}/${total}`;

  const beats = (on: number, control: number) =>
    target.direction === "down" ? on < control : on > control;

  const reasons: string[] = [];
  if (!beats(medianTarget.on, medianTarget.off)) {
    reasons.push(`does not beat baseline on ${target.label} (${medianTarget.on} vs ${medianTarget.off})`);
  }
  if (!beats(medianTarget.on, medianTarget.placebo)) {
    reasons.push(`does not beat placebo on ${target.label} (${medianTarget.on} vs ${medianTarget.placebo})`);
  }
  if (rate(pc.on) < rate(pc.off)) {
    reasons.push(`acceptance pass rate drops vs off (${frac(pc.on)} vs ${frac(pc.off)})`);
  }
  if (rate(pc.on) < rate(pc.placebo)) {
    reasons.push(`acceptance pass rate drops vs placebo (${frac(pc.on)} vs ${frac(pc.placebo)})`);
  }

  return {
    skillId,
    target,
    model: runs[0]?.model ?? "",
    cliVersion: runs[0]?.cliVersion ?? "",
    runsTotal: runs.length,
    totalCostUsd: Math.round(runs.reduce((s, r) => s + r.totalCostUsd, 0) * 100) / 100,
    rows,
    medianTarget,
    deltaVsOffPct: deltaPct(medianTarget.on, medianTarget.off),
    deltaVsPlaceboPct: deltaPct(medianTarget.on, medianTarget.placebo),
    passRate: { off: frac(pc.off), placebo: frac(pc.placebo), on: frac(pc.on) },
    admitted: reasons.length === 0,
    reasons,
  };
}

const fmtDelta = (d: number | null): string => (d === null ? "n/a" : `${d > 0 ? "+" : ""}${d}%`);

export function renderReceipts(receipts: SkillReceipt[]): string {
  const admitted = receipts.filter((r) => r.admitted);
  const rejected = receipts.filter((r) => !r.admitted);
  const lines: string[] = [];

  for (const r of admitted) {
    lines.push(`### ✅ ${r.skillId} — admitted`);
    lines.push("");
    lines.push(
      `${r.target.label}: **${fmtDelta(r.deltaVsOffPct)} vs baseline**, **${fmtDelta(r.deltaVsPlaceboPct)} vs placebo** ` +
        `(medians ${r.medianTarget.off} / ${r.medianTarget.placebo} / ${r.medianTarget.on}). ` +
        `Hold-out acceptance: off ${r.passRate.off}, placebo ${r.passRate.placebo}, on ${r.passRate.on}. ` +
        `${r.runsTotal} runs, ${r.model}, CLI ${r.cliVersion}, total cost $${r.totalCostUsd.toFixed(2)}.`,
    );
    lines.push("");
    lines.push(`| task | off | placebo | on (${r.skillId}) | pass off/placebo/on |`);
    lines.push("|---|---|---|---|---|");
    for (const row of r.rows) {
      lines.push(
        `| ${row.taskId} | ${row.off} | ${row.placebo} | ${row.on} | ${row.passOff}/${row.trials} · ${row.passPlacebo}/${row.trials} · ${row.passOn}/${row.trials} |`,
      );
    }
    lines.push("");
  }

  if (rejected.length > 0) {
    lines.push("### ❌ Did not make the cut");
    lines.push("");
    lines.push("Skills we wrote, measured, and rejected under the same protocol. Published because a results log that only contains wins would not be worth trusting.");
    lines.push("");
    lines.push("| skill | why it was rejected |");
    lines.push("|---|---|");
    for (const r of rejected) {
      lines.push(`| ${r.skillId} | ${r.reasons.join("; ")} |`);
    }
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

export function splice(readme: string, generated: string): string {
  const START = "<!-- BENCH:START -->";
  const END = "<!-- BENCH:END -->";
  const start = readme.indexOf(START);
  const end = readme.indexOf(END);
  if (start === -1 || end === -1) throw new Error(`README is missing ${START} / ${END} sentinels`);
  return readme.slice(0, start + START.length) + "\n" + generated + "\n" + readme.slice(end);
}

async function listDirs(dir: string): Promise<string[]> {
  return (await readdir(dir, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

async function main(): Promise<void> {
  const resultsDir = path.join(root, "bench/results");
  const runs: RunResult[] = [];
  if (existsSync(resultsDir)) {
    for (const sweep of await listDirs(resultsDir)) {
      if (sweep.startsWith("pilot") || sweep.startsWith("smoke")) continue;
      const runsDir = path.join(resultsDir, sweep, "runs");
      if (!existsSync(runsDir)) continue;
      for (const file of (await readdir(runsDir)).sort()) {
        if (!file.endsWith(".json")) continue;
        runs.push(JSON.parse(await readFile(path.join(runsDir, file), "utf8")));
      }
    }
  }

  const receipts: SkillReceipt[] = [];
  for (const skillId of [...new Set(runs.map((r) => r.skillId))].sort()) {
    const meta = JSON.parse(
      await readFile(path.join(root, "skills", skillId, "skill.json"), "utf8"),
    ) as { target: TargetSpec };
    receipts.push(buildReceipt(skillId, meta.target, runs.filter((r) => r.skillId === skillId)));
  }

  const readmePath = path.join(root, "README.md");
  const readme = await readFile(readmePath, "utf8");
  const generated =
    receipts.length === 0
      ? "_Receipts will be generated here from raw run logs. Nothing hand-written appears between these markers._"
      : renderReceipts(receipts);
  const next = splice(readme, generated);

  if (process.argv.includes("--check")) {
    if (next !== readme) {
      console.error("README benchmark section is stale — run `npm run report`");
      process.exit(1);
    }
    console.log("README benchmark section is up to date");
  } else {
    await writeFile(readmePath, next);
    console.log("README benchmark section regenerated");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
