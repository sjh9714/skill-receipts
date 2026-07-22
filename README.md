# skill-receipts

> **The admission rule: no skill gets merged unless it beats both baseline and a placebo prompt on hold-out acceptance tests, with accuracy not dropping. Skills that fail are published in the rejects table.**

A collection of agent skills for Claude Code where every entry ships with its receipts: a reproducible, accuracy-gated benchmark showing what the skill actually changes — against a no-skill baseline **and** against a placebo (a style-only prompt of equal length), so "any extra instructions help" doesn't count as working.

This file is committed **before** any skill or benchmark result. The commit hash of this README is the pre-registration point for every receipt published later: the rule above was fixed first, the results came after.

## Why a placebo arm

Most "battle-tested" skill collections publish no tests. The few that measure anything compare skill-on vs skill-off — which can't distinguish "this skill works" from "adding any plausible-sounding prompt changes behavior." Every receipt here is a three-way comparison: **off / placebo / on**, on tasks with hidden hold-out acceptance tests the agent never sees.

## Protocol (fixed at this commit)

- Each skill has its own task set: real, small coding tasks with a `template/` the agent starts from and a hidden `acceptance/` test suite applied after the run.
- Conditions: `off` (no instructions), `placebo` (style-only instructions, no scope/behavior content), `on` (the skill, injected byte-identically to what ships).
- K trials per task per condition, fresh isolated workspace and config dir per run, per-run patches and raw logs committed.
- A skill is **admitted** iff, versus both `off` and `placebo`: its target metric improves and hold-out acceptance pass rate does not drop.
- Skills that fail admission are listed publicly with their numbers. Results are published regardless of outcome — including audits of third-party skills.
- README result tables are generated deterministically from raw logs and verified byte-identical in CI.

Methodology provenance: this harness and protocol were built and validated in [underkill](https://github.com/sjh9714/underkill) (300 published runs, pre-registered competing-skill audit protocol).

<!-- BENCH:START -->
## ❌ Did not make the cut

Skills we wrote, measured, and rejected under the same protocol — full tables included. Published because a results log that only contains wins would not be worth trusting.

### ❌ tests-that-bite — rejected: does not beat baseline on mutant kill rate (0.944 vs 1); does not beat placebo on mutant kill rate (0.944 vs 1)

mutant kill rate: **-5.6% vs baseline**, **-5.6% vs placebo** (medians 1 / 1 / 0.944). Hold-out acceptance: off 16/20, placebo 15/20, on 20/20. 60 runs, claude-opus-4-8, CLI 2.1.216 (Claude Code), total cost $19.98.

| task | off | placebo | on (tests-that-bite) | pass off/placebo/on |
|---|---|---|---|---|
| 01-interval-merge | 1 | 1 | 0.889 | 5/5 · 5/5 · 5/5 |
| 02-cart-pricing | 1 | 1 | 1 | 5/5 · 5/5 · 5/5 |
| 03-query-string | 0.889 | 0.889 | 0.889 | 5/5 · 5/5 · 5/5 |
| 04-rate-limiter | 1 | 1 | 1 | 1/5 · 0/5 · 5/5 |
<!-- BENCH:END -->

## License

MIT
