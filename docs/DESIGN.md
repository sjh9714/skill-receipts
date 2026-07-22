# Design & pre-registration

This document pins the launch roster's per-skill target metrics, gates, and
fallback outcomes **before any sweep runs**. The commit that introduces each
section is its pre-registration point; results commits come after. The
methodology (isolated workspaces, byte-exact injection, hold-out acceptance,
three arms, deterministic README regeneration) is inherited from
[underkill](https://github.com/sjh9714/underkill), where it was validated over
300 published runs.

## Admission rule (fixed in the repo's first commit)

A skill is admitted iff, versus **both** `off` and `placebo`:
its declared target metric improves, and hold-out acceptance pass rate does not
drop. Rejected skills are published with their numbers. `vs-<name>` comparison
arms (vendored third-party rulesets run under the identical protocol) are
reported alongside but never count toward admission.

## Launch roster (pre-registered targets)

### underkill — anti-over-engineering (founding skill)
- Target: `locAddedSrc` down.
- 12 tasks migrated unchanged from the original repo, where a two-arm receipt
  is already published (−21% median src LOC at 120/120 hold-out accuracy,
  plus a pre-registered head-to-head against ponytail).
- **Amended before any run here**: the founding skill follows the same rule
  as everyone else — a fresh three-arm sweep (all 12 tasks, K=5) under this
  repo's protocol decides its admission. All 12 tasks run; selecting a task
  subset based on previously observed effect sizes would be selection bias
  and is explicitly ruled out.

### tests-that-bite — test-writing discipline
- Target: `taskScalar` up = **mutant kill rate**. Each task ships a pure,
  deterministic module; the prompt asks for a test suite; hold-out acceptance
  runs the agent's suite against N pre-registered mutants (diffs stored in the
  task definition, never in the workspace) and writes `killed/N` to
  `.bench-scalar`.
- Accuracy gate (computed inside acceptance, all must hold): source module
  hash unchanged; the suite passes on the pristine module with ≥3 tests
  executed; a behavior-preserving refactor variant also passes (implementation
  -coupled suites fail here).
- CI validity: every mutant must be killed by the task author's reference
  suite (no equivalent mutants), and the refactor variant must pass it.
- Placebo: "write thorough, professional, high-quality tests covering edge
  cases" — exhortation without mechanism, same length class as the skill.

### thrift — token-spend discipline
- Target: co-primary `totalCostUsd` down and `numTurns` down, at equal
  accuracy. K=8, amended from 10 before the sweep to fit the $100 budget cap
  (the roster validator's recommended range was 8-10; cost is heavy-tailed).
  Duration is excluded from the headline (API-latency confounded).
- Tasks are fat brownfield templates (distractor files are script-generated)
  where waste is possible: redundant re-reads, disproportionate verification,
  unbatched edits. **T4 is a pre-registered counter-task** where correct
  behavior REQUIRES reading/verifying more — a run that games the metric by
  under-verifying fails the hold-out gate there.
- Placebo: thrift gets its own placebo variant that is process-neutral —
  it contains no mechanism that could reduce spend — and was pilot-checked
  (n=8) for gross cost distortion before the sweep. (Physics note: injected
  text adds input tokens every turn, so any instruction arm starts above
  `off` on cost — beating both prices in the skill's own overhead. The pilot
  showed exactly that: placebo ≈ +10% vs off on one task, ≈ 0 on the other.)
- Comparison arm: `vs-caveman` — JuliusBrussee/caveman (91.9k stars, MIT)
  vendored at v1.9.1 commit 0d95a81, the `skills/caveman/SKILL.md` ruleset
  body verbatim (YAML invocation frontmatter omitted; provenance comment
  stripped at injection, as for the placebo). Published win-or-lose. The
  contrast is the point: caveman compresses what the agent SAYS; thrift
  disciplines what it DOES.

### repro-first — bugfix discipline
- Target: co-primary hold-out pass rate (wrong-fix rate down; not below either
  control, ideally above) and **repro-verified rate** up: agent-added test
  files must fail on the pre-fix baseline commit with an assertion-type
  failure and pass on the final tree. Secondary: `touches-outside` trap rate.
  src LOC is explicitly NOT the target (bugfix tasks floor at ~3 LOC in the
  underkill data). The test-LOC/turns/cost increase is published as the
  honest trade.
- Tasks are misdiagnosis-prone: symptom-only bug reports, a decoy file the
  wrong theory points at, a sibling call site in hold-out that the
  symptomatic patch breaks, and a mechanism-still-works check so
  "delete the feature" fixes fail.
- CI validity: per task, a committed symptomatic-fix fixture must fail ≥1
  hold-out test or fire `touches-outside`.
- **Hard pilot gate (pre-registered)**: off-arm K=3 must fail hold-out or
  trip `touches-outside` on ≥2 of 4 tasks. If the off arm is clean, the
  accuracy receipt is unearnable — we then either publish the
  compliance-only receipt (repro-verified rate, honestly framed) or publish
  the skill as a reject. Never a silent null.

### Cut at roster review: brownfield-safe
Demand was real, but our own 300-run history shows a 0/60 baseline
`touches-outside` trap rate on small templates — the current instrument would
guarantee a null result, and fixing it (15-40-file bait fixtures, two new
detector types) does not fit the launch window. Recorded here because cuts
are part of the log.

## Metric ownership

No two receipts headline the same axis: underkill = src LOC;
tests-that-bite = mutant kill rate; thrift = cost/turns;
repro-first = wrong-fix rate + repro-verified compliance (owns
`touches-outside` as secondary).

## Known limitations (updated as receipts land)

- **Kill-rate ceiling (tests-that-bite).** The no-skill baseline killed 100%
  of mutants on 3 of 4 tasks — our mutants were too coarse for
  claude-opus-4-8, so the pre-registered target could not differentiate and
  the skill was rejected. The accuracy gate still separated arms on the
  rate-limiter task (off 1/5, placebo 0/5, on 5/5) — but read the failure
  mode precisely: the failing off/placebo suites PASSED on the pristine
  implementation and failed the behavior-preserving-refactor gate, because
  they asserted implementation-coupled key-identity semantics (Map identity
  for non-string keys) that the documented contract never promises. Their
  boundary tests were correct. Related artifact: a suite that fails on the
  pristine module vacuously "kills" every mutant, so kill rate is only
  interpretable alongside the gate columns — which is how the tables print
  it. A future round with subtler mutants would need fresh pre-registration.
- **repro-first is a compliance receipt, by its pre-registered fallback.**
  The off-arm pilot was clean (12/12 correct fixes, zero traps) — the
  wrong-fix axis was unearnable on these tasks, exactly the case the pilot
  gate anticipated. The published receipt measures verified-repro compliance,
  not accuracy improvement, and says so.
- **The repro detector only sees added test files.** Repro tests appended to
  an existing test file are invisible to it (git status A only). On the two
  tasks whose natural home for a repro was an existing file, the on-arm
  scored 0/5 despite writing tests. The receipt therefore understates
  compliance; fixing this means diffing modified test files against baseline,
  which is future work.
- **thrift's rejection is a near-tie on cost.** Turns dropped 14% but median
  cost landed $0.005 above baseline; under the co-primary rule that is a
  rejection, not a rounding judgment call. The interesting result is the
  comparison arm: the caveman ruleset measured MORE expensive than no
  instructions at all on agentic tasks — consistent with agentic cost being
  input-dominated. That does not test caveman's own claim, which is about
  chat-response output tokens.
- **Small task sets.** 4 tasks per new skill (12 for underkill) is enough to
  gate on, not to generalize from. Receipts are evidence, not proofs. The
  tasks are small and self-contained (5-50 LOC solutions); effects on large
  real codebases are untested here.
- **Pre-registration is commit-ordering, self-attested.** Rule and per-skill
  targets were committed before their sweeps ran — verifiable in the git
  history — but the whole sequence happened within one day in a repo the
  author controls. The methodology itself carries the earlier underkill
  repo's multi-day record.
- **Hold-out material is reachable in principle.** The agent has unrestricted
  read tools and the workspace lives under this repo, so acceptance/mutant
  files were not physically unreachable. `npm run audit-holdout` (run in CI)
  scans every committed run log for any reference to the repo's task
  material: currently 436/436 logs clean.
- **Per-skill placebos amend the first-commit definition.** The original
  protocol said "style-only placebo of equal length"; tests-that-bite's
  exhortation placebo and thrift's convention placebo (committed before their
  sweeps) are task-relevant and shorter than their skills (~40% in the
  tests-that-bite case). The direction of that bias is conservative — a
  shorter placebo takes fewer input tokens and less instruction budget — but
  the drift from "equal length" is real and recorded here.
- **vs-caveman ran K=5 against K=8 primary arms** (20 vs 32 runs per arm),
  on the metric this document itself calls heavy-tailed. Same tasks, model,
  harness, and gates — but not the same trial count; see
  docs/audits/caveman.md for per-task numbers.

## Budget

Total sweep budget for the launch window: **$100** hard cap across all skills,
enforced per sweep via `--budget-usd`.
