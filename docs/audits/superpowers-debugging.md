# Audit #3 — superpowers systematic-debugging (259k★): does the Iron Law produce verified repros?

**Finding: yes — it works. The most-starred debugging ruleset produced a
machine-verified repro test in 8/20 runs (4× the no-instruction baseline's
2/20), at +73% cost per run. Our own 40-line repro-first skill scored 10/20
at lower cost on the same tasks. Both beat baseline decisively; neither
moved accuracy, which was already saturated.**

Pre-registered before any run in
[docs/DESIGN.md](../DESIGN.md) (commit precedes results; see the repo
history), as flagged in the roster review: the skill's own Iron Law — "no
fixes without root cause investigation first", write failing tests before
fixes — makes verified-repro rate exactly its claim territory.

## Setup

- Ruleset: obra/superpowers `skills/systematic-debugging/SKILL.md` body,
  vendored verbatim at **v6.1.1, commit d884ae0** (MIT, full notice in
  [`bench/competitors/superpowers-debugging.md`](../../bench/competitors/superpowers-debugging.md)).
  Rules-only injection — the skill's companion reference files are not
  injected, same scope as every other arm.
- Tasks/harness: repro-first's 4 misdiagnosis bugfix tasks,
  `claude-opus-4-8`, K=5 (20 runs; primary arms ran K=5 too), hidden
  hold-out gates, isolated workspaces.
- Detector: a repro counts only if the agent-added test file FAILS on the
  pre-fix baseline commit (assertion failure, not import error) and passes
  on the final tree.

## Results

| arm | verified-repro runs | accuracy | cost/run (median) | test LOC (median) |
|---|---|---|---|---|
| off | 2/20 | 20/20 | $0.177 | 0 |
| placebo | 0/20 | 20/20 | $0.189 | 0 |
| repro-first (ours, 40 lines) | 10/20 | 20/20 | $0.245 | 11 |
| **systematic-debugging (296 lines)** | **8/20** | **20/20** | **$0.307** | **14.5** |

Per-task verified repros (systematic-debugging): cache-key-leak 5/5,
short-page 3/5, discount-drift 0/5, email-regex 0/5 — the same
zero-on-01/04 pattern as every arm, because the detector only sees *added*
test files and those two tasks invite appending to an existing suite (a
known instrument limitation, recorded in DESIGN; it understates all arms
equally).

## Reading it

1. **The Iron Law is real, not vibes.** 4× the baseline's verified-repro
   rate under a detector that can't be gamed by test-shaped prose — on the
   first accuracy-gated measurement of this skill we know of.
2. **Accuracy was already saturated** (all arms 20/20): on tasks this size,
   Opus 4.8 finds the root cause unaided. What the ruleset changes is the
   *evidence* the fix ships with, and its price: about half again the tokens
   of our shorter skill for a comparable compliance rate.
3. **Length didn't buy compliance.** 296 lines of process scored slightly
   below 40 lines of focused rules on this axis. That's one data point, not
   a law — but it's the direction our placebo results keep pointing:
   instruction *presence* is cheap, instruction *mechanism* is what pays.
