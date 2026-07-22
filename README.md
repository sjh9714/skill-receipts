# skill-receipts

**Agent skills for Claude Code where every entry ships with its receipts** — a
reproducible, accuracy-gated benchmark against a no-skill baseline **and** a
placebo prompt. Skills that fail are published too, with their numbers.

> **The admission rule (pre-registered in this repo's first commit,
> [`347cb54`](https://github.com/sjh9714/skill-receipts/commit/347cb54)): no
> skill gets merged unless it beats both baseline and placebo on hold-out
> acceptance tests, with accuracy not dropping. Rejects go in the table
> below.**

## Install

As a Claude Code plugin (all admitted skills at once):

```
/plugin marketplace add sjh9714/skill-receipts
/plugin install skill-receipts
```

Or take a single skill: every skill ships as `skills/<name>/SKILL.md` (works
with `npx skills add sjh9714/skill-receipts`), and as a copy-paste
`skills/<name>/dist/CLAUDE.md.snippet` — **byte-identical to what the
benchmark measured**, which CI enforces.

## Why a placebo arm

Most "battle-tested" skill collections publish no tests. The few that measure
anything compare skill-on vs skill-off — which can't distinguish "this skill
works" from "adding any plausible-sounding prompt changes behavior." Every
receipt here is a three-way comparison — **off / placebo / on** — on tasks
with hidden hold-out acceptance tests the agent never sees, K=5+ trials per
task per arm, isolated workspaces, raw logs and per-run patches committed.

Popular third-party skills get the same treatment:
**[Audit #1 — ponytail (87k★)](docs/audits/ponytail.md)** ran the
most-installed anti-over-engineering skill under this protocol, pre-registered
and published win-or-lose (spoiler: it won on LOC, at a cost).

## Receipts

Everything between the markers below is generated from the raw run logs in
[`bench/results/`](bench/results/) and verified byte-identical in CI —
nothing hand-written.

<!-- BENCH:START -->
### ✅ underkill — admitted

src LOC added: **-23.8% vs baseline**, **-36% vs placebo** (medians 10.5 / 12.5 / 8). Hold-out acceptance: off 60/60, placebo 60/60, on 60/60. 180 runs, claude-opus-4-8, CLI 2.1.216 (Claude Code), total cost $22.69.

| task | off | placebo | on (underkill) | pass off/placebo/on |
|---|---|---|---|---|
| 01-fetch-retry | 16 | 19 | 13 | 5/5 · 5/5 · 5/5 |
| 02-ttl-cache | 20 | 28 | 13 | 5/5 · 5/5 · 5/5 |
| 03-todo-cli | 44 | 48 | 17 | 5/5 · 5/5 · 5/5 |
| 04-slugify | 8 | 8 | 8 | 5/5 · 5/5 · 5/5 |
| 05-markdown-toc | 21 | 22 | 15 | 5/5 · 5/5 · 5/5 |
| 06-cart-total | 4 | 4 | 4 | 5/5 · 5/5 · 5/5 |
| 07-search-bugfix | 3 | 3 | 3 | 5/5 · 5/5 · 5/5 |
| 08-users-endpoint | 9 | 9 | 9 | 5/5 · 5/5 · 5/5 |
| 09-bulk-discount | 5 | 5 | 2 | 5/5 · 5/5 · 5/5 |
| 10-relative-time | 11 | 13 | 8 | 5/5 · 5/5 · 5/5 |
| 11-csv-summarize | 21 | 25 | 6 | 5/5 · 5/5 · 5/5 |
| 12-date-format | 10 | 12 | 3 | 5/5 · 5/5 · 5/5 |

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

### ❌ thrift — rejected: does not beat baseline on cost per run (USD) (0.168 vs 0.163)

cost per run (USD): **+3.3% vs baseline**, **-3.5% vs placebo** (medians 0.163 / 0.174 / 0.168). Hold-out acceptance: off 32/32, placebo 32/32, on 32/32. 96 runs, claude-opus-4-8, CLI 2.1.216 (Claude Code), total cost $25.00.

| task | off | placebo | on (thrift) | pass off/placebo/on |
|---|---|---|---|---|
| 01-haystack-bugfix | 0.171 | 0.19 | 0.164 | 8/8 · 8/8 · 8/8 |
| 02-batch-rename | 0.625 | 0.56 | 0.607 | 8/8 · 8/8 · 8/8 |
| 03-typo-expensive-suite | 0.119 | 0.125 | 0.127 | 8/8 · 8/8 · 8/8 |
| 04-pager-contract | 0.155 | 0.158 | 0.172 | 8/8 · 8/8 · 8/8 |

> Comparison arm **vs-caveman** (vendored ruleset, identical protocol, not part of admission): cost per run (USD) median 0.183, acceptance 20/20, 20 runs.
<!-- BENCH:END -->

## Methodology

Full protocol, per-skill pre-registered targets, amendments, and known
limitations: [docs/DESIGN.md](docs/DESIGN.md). The harness was built and
validated in [underkill](https://github.com/sjh9714/underkill) (300 published
runs); this repo generalizes it to N skills with per-skill task sets, a
placebo arm by default, mutation-testing receipts, and a repro-verified
detector.

Want a skill admitted (yours or a famous one audited)? Open an issue — the
gate is the same for everyone.

## License

MIT
