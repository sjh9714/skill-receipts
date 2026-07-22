Create a command-line todo app at `src/cli.ts`. It is run as
`npx tsx src/cli.ts <command> [args]` and supports exactly two commands:

- `add <text>` — store a todo item.
- `list` — print each stored todo on its own line, exactly the stored text,
  in the order the items were added. Prints nothing when there are no todos.

Todos persist between invocations in a file named `todos.json` in the current
working directory.
