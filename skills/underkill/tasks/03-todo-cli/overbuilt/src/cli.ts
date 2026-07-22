// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import { Command } from "commander";
import { readFileSync, writeFileSync } from "node:fs";

export interface CliOptions {
  storePath?: string;
}

export interface TodoConfig {
  storePath: string;
  colors: boolean;
}

abstract class BaseCommand {
  abstract execute(args: string[]): void;
}

export class AddCommand extends BaseCommand {
  constructor(private readonly config: TodoConfig) {
    super();
  }
  execute(args: string[]): void {
    const todos = loadStore(this.config);
    todos.push(args.join(" "));
    writeFileSync(this.config.storePath, JSON.stringify(todos));
  }
}

function loadStore(config: TodoConfig): string[] {
  try {
    return JSON.parse(readFileSync(config.storePath, "utf8"));
  } catch {
    return [];
  }
}

const program = new Command();
program.command("add <text...>").action((text: string[]) => {
  new AddCommand({ storePath: "todos.json", colors: false }).execute(text);
});
program.command("list").action(() => {
  for (const todo of loadStore({ storePath: "todos.json", colors: false })) console.log(todo);
});
program.command("remove <index>").action(() => {});
program.command("clear").action(() => {});
program.parse();
