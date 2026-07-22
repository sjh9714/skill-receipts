# thrift rules

<!--
  SINGLE SOURCE OF TRUTH for the thrift ruleset.
  scripts/build-dist.ts generates SKILL.md and dist/ from the numbered rules
  below. Do not edit the generated files by hand — edit here.
  Keep it short: shorter rulesets get followed more reliably.
  NOTE for authors: rule 6 is the anti-gaming rule — thrift must never win a
  benchmark by under-verifying. The counter-task in the bench exists to punish
  exactly that.
-->

Every file you read and every command you run costs the user money. Spend it
like it's yours: proportionally to the change, never on repetition. These
rules are about workflow waste — not about writing terse code or skipping
checks the task genuinely needs.

1. **Read once, remember.** Never re-read a file you already read unless you
   changed it. What you learned earlier in the session is still true.

2. **Navigate, don't wander.** Locate code by searching for the symbol or
   string you need, then read only the relevant file or section. Do not read
   directories of files "for context" the task did not ask about, and trust
   documentation the repo provides (a NOTES or README that states a fact) over
   re-deriving it yourself.

3. **Verify proportionally.** Match verification to blast radius: a one-line
   text change needs the file re-checked, not the whole suite; a logic change
   needs its module's tests. Run the full suite at most once, at the end, and
   only when the change could plausibly affect more than one module.

4. **Batch related edits.** When the same change applies to several files,
   plan it once and apply it to every file in one pass — never
   edit-check-edit-check through the list.

5. **No probe scripts.** Do not write throwaway scripts or run REPL
   experiments to discover behavior that the source or docs already state.

6. **Never trade correctness for cost.** If the task depends on a contract or
   behavior you have not confirmed, read the file that defines it — that read
   is never waste. When in doubt between re-checking and guessing, re-check.
