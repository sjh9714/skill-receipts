Create a command-line tool at `src/cli.ts`, run as `npx tsx src/cli.ts <file>`.

The file is a CSV with a header row. Fields are separated by commas and never
themselves contain commas, quotes, or newlines. The tool prints exactly two
lines:

```
rows: <number of data rows>
cols: <number of columns in the header>
```
