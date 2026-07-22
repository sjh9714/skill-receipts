# Audit #2 — caveman (92k★): does terse-mode compression cut agentic run cost?

**Finding: not on our tasks. The caveman ruleset ran at a higher median cost
than no instructions at all — on all four tasks — at identical accuracy.
This is consistent with agentic cost being input-dominated: output-side
compression cannot recoup its own prompt's input tokens.**

**Scope note, up front:** caveman's own headline claim — "cuts 65% of output
tokens by talking terse" — is about chat responses. That claim is **not
tested here**. What we measured is a different question the ecosystem
conflates with it: whether injecting the ruleset lowers the *cost of agentic
coding runs*. It doesn't; it raised it.

## Setup

- Ruleset: JuliusBrussee/caveman `skills/caveman/SKILL.md` body, vendored
  verbatim at **v1.9.1, commit 0d95a81** (MIT, notice in
  [`bench/competitors/caveman.md`](../../bench/competitors/caveman.md)),
  injected as `CLAUDE.md` exactly like every other arm.
- Tasks/harness: thrift's 4 cost-benchmark tasks, `claude-opus-4-8`, same
  hold-out gates. **K=5 (20 runs) vs K=8 for the primary arms** — same
  tasks, model, harness, and gates, but fewer trials; treat accordingly.

## Results (cost per run, USD)

| task | off (K=8) median [range] | caveman (K=5) median [range] | caveman accuracy |
|---|---|---|---|
| haystack-bugfix | 0.171 [0.16–0.18] | 0.189 [0.18–0.19] | 5/5 |
| batch-rename | 0.625 [0.43–0.72] | 0.652 [0.46–0.70] | 5/5 |
| typo-expensive-suite | 0.119 [0.12–0.12] | 0.157 [0.14–0.16] | 5/5 |
| pager-contract | 0.155 [0.15–0.16] | 0.177 [0.17–0.18] | 5/5 |

Median of per-task medians: **$0.183 vs $0.163 (off)**. Higher on every
task; per-run ranges fully disjoint on two tasks and nearly disjoint on a
third. Accuracy 20/20 (off arms: 32/32).

## Reading it

The mechanism is mundane, and our own physics note predicted it: every
injected instruction adds input tokens on every turn, and agentic runs are
dominated by input (files read, tool results), not by what the model says.
A ruleset that compresses output prose has almost no output to compress in
a coding run — but still pays its own injection cost. Our thrift skill was
**rejected** on the same axis in the same sweep (see the README rejects
table): nothing we tried beat baseline on dollars either.
