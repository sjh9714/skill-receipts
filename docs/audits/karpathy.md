# Audit #4 — Karpathy Guidelines (≈196k★): does the most-starred behavioral ruleset write less code?

**Finding: partly. The ≈196k-star Karpathy Guidelines skill clearly beats a
placebo on code size (median −23%), so its "Simplicity First" rule is real
mechanism, not prompt-presence. But against a no-instruction baseline it barely
moves (median 10 vs 10.5 LOC, −4.8%) — on tasks this small, Opus 4.8 unaided is
already near-minimal. Our 20-line single-purpose `underkill` skill produces
20% less code than the general ruleset (median 8 vs 10) at equal accuracy
(60/60 both) and slightly lower cost. Accuracy never moved for any arm.**

Pre-registered before any run in [docs/DESIGN.md](../DESIGN.md) (the
`vs-karpathy` commit precedes this results commit; see the repo history). The
skill's §2 "Simplicity First" makes a direct, falsifiable claim on
`underkill`'s exact pre-registered metric — *"If you write 200 lines and it
could be 50, rewrite it."* — so `underkill`'s 12 LOC tasks are its claim
territory.

## Setup

- Ruleset: `multica-ai/andrej-karpathy-skills`
  `skills/karpathy-guidelines/SKILL.md` body, vendored verbatim at repo HEAD
  commit `2c60614` (body unchanged since `64723a4`). License MIT, as declared
  in the skill's own frontmatter (`license: MIT`) and the repo README; the
  upstream ships no standalone LICENSE file, so attribution is to the
  repository. Full notice in
  [`bench/competitors/karpathy.md`](../../bench/competitors/karpathy.md).
  Rules-only injection — the four numbered guidelines, YAML frontmatter
  omitted, provenance comment stripped, identical in scope to every other arm.
- Tasks/harness: `underkill`'s 12 LOC tasks, `claude-opus-4-8`, K=5 (60 runs),
  hidden hold-out acceptance gates, isolated workspaces. The `off` / `placebo`
  / `underkill-on` columns are the already-published runs from the underkill
  sweep — not re-run.
- Headline metric: `locAddedSrc` (source LOC the agent added), pre-registered.

## Results

Median source LOC added, per task and overall (lower is less code; all arms
passed every hold-out test, so every cell is at equal accuracy):

| task | off | placebo | underkill (ours, ~20 lines) | **karpathy (≈196k★)** |
|---|---|---|---|---|
| 01-fetch-retry | 16 | 19 | 13 | 15 |
| 02-ttl-cache | 20 | 28 | 13 | 18 |
| 03-todo-cli | 44 | 48 | 17 | 28 |
| 04-slugify | 8 | 8 | 8 | 8 |
| 05-markdown-toc | 21 | 22 | 15 | 16 |
| 06-cart-total | 4 | 4 | 4 | 4 |
| 07-search-bugfix | 3 | 3 | 3 | 3 |
| 08-users-endpoint | 9 | 9 | 9 | 9 |
| 09-bulk-discount | 5 | 5 | 2 | 5 |
| 10-relative-time | 11 | 13 | 8 | 11 |
| 11-csv-summarize | 21 | 25 | 6 | 16 |
| 12-date-format | 10 | 12 | 3 | 9 |
| **overall median** | **10.5** | **13.0** | **8.0** | **10.0** |
| **hold-out accuracy** | 60/60 | 60/60 | 60/60 | 60/60 |
| **cost / run (median)** | $0.113 | $0.118 | $0.119 | $0.126 |

Overall: karpathy **−4.8% vs baseline**, **−23.1% vs placebo**; `underkill`
sits **20% below karpathy** (8 vs 10).

## Reading it

1. **It beats the placebo, so the mechanism is real.** −23% vs a same-length
   style-only placebo is the cell that matters most: it separates "this rule
   does something" from "any plausible prompt changes behavior." Karpathy's §2
   passes that bar cleanly. Most skill collections never run this arm.
2. **Against no instructions at all, it barely moves — because the tasks are
   small.** Median 10 vs 10.5 is within noise, and on 5 of 12 tasks (the
   3–9-LOC floor tasks: slugify, cart-total, search-bugfix, users-endpoint,
   bulk-discount) every arm ties — there is simply no bloat to remove. The
   work happens on the tasks where over-engineering is possible: todo-cli
   (off 44 → karpathy 28), csv-summarize (21 → 16), ttl-cache (20 → 18). A
   general behavioral ruleset earns its keep exactly where an agent would
   otherwise over-build, and nowhere else — which is the honest scope of what
   these guidelines buy you.
3. **A 20-line focused skill beats the ≈196k-star general one by another 20%.**
   On the same bloat-prone tasks, `underkill` cuts deeper: todo-cli 28 → 17,
   csv-summarize 16 → 6, date-format 9 → 3 — at the same 60/60 accuracy and
   $0.007/run less. Not a knock on the Karpathy skill: it addresses four
   different failure modes (assumptions, simplicity, surgical edits, verifiable
   goals) and only §2 is on this axis. But it's the same direction our placebo
   results keep pointing — a rule aimed at one metric beats a broad ruleset that
   mentions it, on that metric.
4. **Caveats.** These are small self-contained tasks (3–48 LOC solutions);
   effects on large codebases are untested. `underkill`'s off/placebo/on
   numbers are the prior sweep's, not re-run alongside karpathy — but karpathy
   ran the identical tasks, model, harness, and gates, K=5. Karpathy's other
   three guidelines (§1, §3, §4) are not measured here; §3 "Surgical Changes"
   and §4 "Goal-Driven Execution" would be tested on `repro-first`'s
   touches-outside and verified-repro axes, which is a separate audit.
