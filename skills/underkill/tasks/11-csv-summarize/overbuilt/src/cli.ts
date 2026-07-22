// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import { readFileSync } from "node:fs";
import Papa from "papaparse";

export interface SummarizeOptions {
  delimiter?: string;
  json?: boolean;
}

export class CsvSummarizer {
  constructor(private readonly options: SummarizeOptions = {}) {}

  summarize(file: string): { rows: number; cols: number } {
    const parsed = Papa.parse<string[]>(readFileSync(file, "utf8").trim(), {
      delimiter: this.options.delimiter ?? ",",
    });
    return { rows: parsed.data.length - 1, cols: parsed.data[0]?.length ?? 0 };
  }
}

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const file = args.find((a) => !a.startsWith("--"));
const summary = new CsvSummarizer({ json: asJson }).summarize(file ?? "");
if (asJson) console.log(JSON.stringify(summary));
else {
  console.log(`rows: ${summary.rows}`);
  console.log(`cols: ${summary.cols}`);
}
