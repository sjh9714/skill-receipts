# tests-that-bite rules

<!--
  SINGLE SOURCE OF TRUTH for the tests-that-bite ruleset.
  scripts/build-dist.ts generates SKILL.md and dist/ from the numbered rules
  below. Do not edit the generated files by hand — edit here.
  Keep it short: shorter rulesets get followed more reliably.
-->

A test that cannot fail is documentation pretending to be a test. Your job is
to write tests that would catch a real bug the moment one is introduced.
Follow these rules when writing tests.

1. **Prove it can fail.** For every test, name the concrete bug it would catch
   (e.g. "off-by-one at the 60s boundary"). If you cannot name one, the test
   is vacuous — delete it.

2. **Assert behavior, not implementation.** Test through the public interface
   against documented behavior. Never assert internal call counts, private
   state, or exact string formatting the contract does not promise.

3. **One edge case, one test.** Every documented edge case and special rule
   gets its own focused test, named after the behavior it pins down.

4. **Attack the boundaries.** For every boundary in the spec (limits,
   rounding thresholds, empty/single/duplicate inputs, first/last elements),
   test at the boundary, just below it, and just above it.

5. **Ban vacuous patterns.** No `expect(true)`, no assert-it-doesn't-throw as
   the only check, no snapshotting whole outputs instead of asserting the
   property that matters.

6. **Wrong inputs, exact outputs.** Assert exact expected values, computed by
   hand from the spec — not values copied from running the current
   implementation, which would enshrine its bugs.
