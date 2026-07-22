Fix the typo in the CLI's unknown-option error message: it currently says
"Uknown option" and should say "Unknown option". The message lives in
src/errors.js.

Also add a line under the `## Unreleased` heading in CHANGELOG.md noting the
fix, e.g. "- Fix typo in unknown-option error message."

Nothing else should change.
