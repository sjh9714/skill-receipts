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
- 12 tasks migrated unchanged from the original repo, where its receipt is
  already published (−21% median src LOC at 120/120 hold-out accuracy, plus a
  pre-registered head-to-head against ponytail). Any receipt shown here is
  regenerated from fresh runs under this repo's three-arm protocol; until then
  the README links to the original published sweeps.

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
  accuracy. K=10 (cost is heavy-tailed). Duration is excluded from the
  headline (API-latency confounded).
- Tasks are fat brownfield templates (distractor files are script-generated)
  where waste is possible: redundant re-reads, disproportionate verification,
  unbatched edits. **T4 is a pre-registered counter-task** where correct
  behavior REQUIRES reading/verifying more — a run that games the metric by
  under-verifying fails the hold-out gate there.
- Placebo: thrift gets its own placebo variant that is process-neutral AND
  verbosity-neutral, pilot-verified cost-inert before the sweep. (Physics
  note: injected text adds input tokens every turn, so any instruction arm
  starts above `off` on cost — beating both prices in the skill's own
  overhead.)
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

## Budget

Total sweep budget for the launch window: **$100** hard cap across all skills,
enforced per sweep via `--budget-usd`.
