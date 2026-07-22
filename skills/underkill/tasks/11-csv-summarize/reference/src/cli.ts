// Minimal correct implementation. Used only by CI to prove the acceptance tests
// are satisfiable (reference passes) and non-trivial (empty template fails).
import { readFileSync } from "node:fs";

const lines = readFileSync(process.argv[2], "utf8")
  .split("\n")
  .filter((line) => line !== "");
console.log(`rows: ${lines.length - 1}`);
console.log(`cols: ${lines[0].split(",").length}`);
