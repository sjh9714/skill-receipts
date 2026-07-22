// Minimal correct implementation. Used only by CI to prove the acceptance tests
// are satisfiable (reference passes) and non-trivial (empty template fails).
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "todos.json";
const [command, ...rest] = process.argv.slice(2);

function load(): string[] {
  try {
    return JSON.parse(readFileSync(FILE, "utf8"));
  } catch {
    return [];
  }
}

if (command === "add") {
  const todos = load();
  todos.push(rest.join(" "));
  writeFileSync(FILE, JSON.stringify(todos));
} else if (command === "list") {
  for (const todo of load()) console.log(todo);
}
