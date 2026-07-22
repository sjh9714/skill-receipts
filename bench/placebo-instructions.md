<!-- Control-arm instructions for the benchmark's placebo condition: style
     guidance of comparable length to the underkill snippet, deliberately
     containing no rules about scope, size, or what to build. Used to check
     the "any instructions at all would do that" confound. -->
## Code quality notes

Write code that a colleague can read without asking questions. Follow these
notes when writing or changing code.

1. **Clear names.** Use descriptive variable and function names; avoid
   single-letter names outside loop indices.

2. **Consistent formatting.** Match the file's existing indentation, quote
   style, and import ordering.

3. **Prefer clarity over cleverness.** Use the language's common idioms
   rather than dense one-liners; when a line's purpose is not obvious,
   prefer a clearer name over explanatory prose.

4. **Readable control flow.** Prefer early returns over deeply nested
   branches.

5. **Consistent messages.** Any text the program prints should use one
   consistent capitalization and punctuation style.

6. **Leave the campsite tidy.** Keep unrelated formatting churn out of the
   final state of the files you touch.
