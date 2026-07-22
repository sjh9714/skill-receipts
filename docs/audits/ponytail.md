# Audit #1 — ponytail (87k★): does the most-starred anti-over-engineering skill actually work?

**Verdict: yes — it works. Under the pre-registered statistic it cuts more
LOC on the median task than our own skill; under pooled totals ours cuts
more. It also writes test code the tasks didn't ask for and costs about half
again as much per run. Receipts below.**

This audit was run under a pre-registered protocol
([underkill@17ed0e5](https://github.com/sjh9714/underkill/commit/17ed0e5),
committed as the sweep was launched — registration precedes every result,
by minutes not days) with the exact harness this repo uses: hidden hold-out
acceptance tests, isolated workspaces, byte-exact rules injection, identical
tasks/model/trials for every arm. Raw logs, per-run patches, and the
vendored ruleset live in the [underkill repo](https://github.com/sjh9714/underkill);
this page summarizes them.

## Setup

- Ruleset: DietrichGebert/ponytail `AGENTS.md`, vendored verbatim at
  **v4.8.4, commit 16f2980** (MIT), injected as `CLAUDE.md` — rules-only, the
  plugin's hook machinery is out of scope.
- Tasks: the 12 underkill benchmark tasks (frozen pre-registration), model
  `claude-opus-4-8`, K=5 trials, same harness, same hold-out gates.
- Comparators: `off` (no instructions) and `underkill`, from the base
  120-run sweep.

## Results

Statistic: **median of per-task Δ% vs off**, as pre-registered in D8. This
ranking is aggregation-sensitive: by median of per-task medians the two
skills tie (8.5 vs 8.5 LOC), and by pooled total LOC underkill cuts more
(−37.9% vs −29.3%). All three statistics are computable from the published
runs; we report the pre-registered one and disclose the others.

| arm | median per-task Δ src LOC vs off | hold-out accuracy | median test LOC/run | median cost/run |
|---|---|---|---|---|
| off (baseline) | — | 60/60 | 0 | $0.111 |
| underkill | −21.0% | 60/60 | 0 | $0.118 |
| **ponytail** | **−27.9%** | **60/60** | **+11** | **$0.169 (+53% vs off, +44% vs underkill)** |

## What the receipts say

1. **Ponytail's core claim is real.** Under an accuracy-gated harness it cut
   shipped source LOC with zero hold-out failures — on the pre-registered
   per-task statistic, more than our own skill did. Published win-or-lose;
   on that statistic, this one is a win for ponytail.
2. **The cut is not free.** Its ruleset mandates self-checks, which showed up
   as +11 lines of test code per run the tasks didn't request, and +53% cost
   per run vs no instructions ($0.169 vs $0.111 median).
3. **Why publish an audit we "lose"?** Because a results log that only
   contains wins would not be worth trusting — and because nobody else had
   measured one of the ecosystem's most popular skills against a hidden
   acceptance gate at all.

*Audits of other popular rulesets follow the same harness; see
[caveman](caveman.md) for the second one.*
