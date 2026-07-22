# Audit #1 — ponytail (87k★): does the most popular anti-over-engineering skill actually work?

**Verdict: yes — it works, and it out-cuts our own skill. It also costs more
per run and writes test code the task didn't ask for. Receipts below.**

This audit was run under a pre-registered protocol (committed before any
result: [underkill@17ed0e5](https://github.com/sjh9714/underkill/commit/17ed0e5))
with the exact harness this repo uses: hidden hold-out acceptance tests,
isolated workspaces, byte-exact rules injection, identical tasks/model/trials
for every arm. Full raw logs, per-run patches, and the vendored ruleset are
published in the [underkill repo](https://github.com/sjh9714/underkill).

## Setup

- Ruleset: DietrichGebert/ponytail `AGENTS.md`, vendored verbatim at
  **v4.8.4, commit 16f2980** (MIT), injected as `CLAUDE.md` — rules-only, the
  plugin's hook machinery is out of scope.
- Tasks: the 12 underkill benchmark tasks (frozen pre-registration), model
  `claude-opus-4-8`, K=5 trials, same harness, same hold-out gates.
- Comparators: `off` (no instructions) and `underkill` from the base
  120-run sweep.

## Results (median src LOC added per task)

| arm | median Δ src LOC vs off | hold-out accuracy | median test LOC/run | median cost/run |
|---|---|---|---|---|
| off (baseline) | — | 60/60 | 0 | $0.11 |
| underkill | −21.0% | 60/60 | 0 | $0.12 |
| **ponytail** | **−27.9%** | **60/60** | **+11** | **$0.17 (+55% vs off)** |

## What the receipts say

1. **Ponytail's core claim is real.** Under an accuracy-gated harness it cut
   shipped source LOC more than our own skill did, with zero hold-out
   failures. Published win-or-lose — this one is a win for ponytail.
2. **The cut is not free.** Its ruleset mandates self-checks, which showed up
   as +11 lines of test code per run the tasks didn't request and about half
   again the cost per run ($0.17 vs $0.11 baseline). Whether that trade is
   good depends on what you're optimizing.
3. **Why publish an audit we "lose"?** Because a results log that only
   contains wins would not be worth trusting — and because nobody else had
   measured the most-installed skill in the ecosystem against a hidden
   acceptance gate at all.

*Audits of other popular skills follow the same protocol; the next target is
the caveman ruleset (see the thrift receipt's `vs-caveman` arm).*
