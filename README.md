# skill-receipts

**Agent skills for Claude Code where every entry ships with its receipts** — a
reproducible, accuracy-gated benchmark against a no-skill baseline **and** a
placebo prompt. Skills that fail are published too, with their numbers.

**Featured — [Audit #4](docs/audits/karpathy.md):** we ran the ≈196k★
[Karpathy Guidelines](https://github.com/multica-ai/andrej-karpathy-skills)
skill on our exact source-LOC metric. It beats a placebo (−23%) but barely
beats no instructions at all (−4.8%) — and our 20-line `underkill` writes 20%
less code than it does, at the same 60/60 hold-out accuracy.

> **The admission rule (pre-registered in this repo's first commit,
> [`347cb54`](https://github.com/sjh9714/skill-receipts/commit/347cb54)): no
> skill gets merged unless it beats both baseline and placebo on its
> pre-registered target metric, measured on tasks with hidden hold-out
> acceptance tests, with accuracy not allowed to drop. Rejects go in the
> table below.**

| skill | verdict | headline |
|---|---|---|
| [underkill](skills/underkill) | ✅ admitted | −23.8% src LOC vs baseline, −36% vs placebo, accuracy 60/60/60 |
| [repro-first](skills/repro-first) | ✅ admitted | verified repro tests appear in 10/20 runs vs 2/20 off, 0/20 placebo (compliance receipt — see note) |
| tests-that-bite | ❌ rejected | baseline already killed 100% of our mutants — ceiling; full table below |
| thrift | ❌ rejected | cut turns −14% but not dollars; the [caveman comparison](docs/audits/caveman.md) is the interesting part |

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

Popular third-party rulesets get the same treatment, published win-or-lose:
**[Audit #4 — Karpathy Guidelines (≈196k★)](docs/audits/karpathy.md)** ran the
most-starred behavioral skill on `underkill`'s exact metric — it beats a
placebo (−23% LOC) but barely beats no instructions at all (−4.8%), and our
20-line skill writes 20% less code than it does.
**[Audit #1 — ponytail (87k★)](docs/audits/ponytail.md)** ran the
most-starred anti-over-engineering skill under the same protocol (it won on
LOC, at a cost); **[Audit #2 — caveman (92k★)](docs/audits/caveman.md)**
measured whether terse-mode compression cuts agentic run cost (it didn't — it
raised it); **[Audit #3 — superpowers systematic-debugging
(259k★)](docs/audits/superpowers-debugging.md)** found the Iron Law produces
verified repros at 4× baseline, at +73% cost.

## Receipts

Everything between the markers below is generated from the raw run logs in
[`bench/results/`](bench/results/) and verified byte-identical in CI —
nothing hand-written.

<!-- BENCH:START -->
### ✅ repro-first — admitted

verified-repro rate: **on 10/20 runs vs off 2/20 vs placebo 0/20**. Hold-out acceptance: off 20/20, placebo 20/20, on 20/20. 60 runs, claude-opus-4-8, CLI 2.1.216 (Claude Code), total cost $12.94.

> Compliance receipt via the pre-registered pilot-gate fallback (docs/DESIGN.md): the off arm fixed every misdiagnosis task (pilot 12/12, sweep 20/20), so the accuracy axis was unearnable. What the skill measurably changes is that fixes arrive with a machine-verified regression test — one that fails on the pre-fix baseline and passes after — at +$0.07/run and +11 test LOC median. Detector counts added test files only, so this understates compliance where the repro belongs in an existing file (tasks 01/04).

| task | off | placebo | on (repro-first) | pass off/placebo/on |
|---|---|---|---|---|
| 01-discount-drift | 0 | 0 | 0 | 5/5 · 5/5 · 5/5 |
| 02-short-page | 0 | 0 | 1 | 5/5 · 5/5 · 5/5 |
| 03-cache-key-leak | 0 | 0 | 1 | 5/5 · 5/5 · 5/5 |
| 04-email-regex | 0 | 0 | 0 | 5/5 · 5/5 · 5/5 |

> Comparison arm **vs-superpowers-debugging** (vendored ruleset — same tasks, model, harness, and gates; trial count may differ from the primary arms; never part of admission): verified-repro rate median 0.5, acceptance 20/20, 20 runs. See docs/audits/superpowers-debugging.md.

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

> Comparison arm **vs-karpathy** (vendored ruleset — same tasks, model, harness, and gates; trial count may differ from the primary arms; never part of admission): src LOC added median 10, acceptance 60/60, 60 runs. See docs/audits/karpathy.md.

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

> Comparison arm **vs-caveman** (vendored ruleset — same tasks, model, harness, and gates; trial count may differ from the primary arms; never part of admission): cost per run (USD) median 0.183, acceptance 20/20, 20 runs. See docs/audits/caveman.md.
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
