<!--
  PLACEBO for the thrift receipt (pre-registered in docs/DESIGN.md):
  process-neutral AND verbosity-neutral. It contains naming/formatting
  preferences of comparable length to the skill, with no cues about terseness,
  reading, verification, batching, or any workflow behavior — so the receipt
  isolates workflow discipline from mere instruction presence. Must be
  pilot-verified cost-inert before the sweep. This comment is stripped before
  injection.
-->
This codebase follows a few stylistic conventions. Please keep to them in any
code you write or modify.

1. Use double quotes for string literals in JavaScript and TypeScript files,
   matching the prevailing style of each file you touch.

2. Prefer descriptive lowerCamelCase names for local variables and function
   parameters; reserve UPPER_SNAKE_CASE for true constants defined at module
   scope.

3. Keep import statements grouped: Node built-ins first, then external
   packages, then local modules, each group separated by a blank line.

4. When declaring functions, prefer named function declarations for exported
   symbols and arrow functions for local helpers, matching what the
   surrounding file already does.

5. End every file with a single trailing newline, and avoid introducing
   trailing whitespace on any line.

6. In comments, write complete sentences that start with a capital letter,
   and keep the comment style (line vs block) consistent with the file.
