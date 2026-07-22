// Hold-out reachability audit, run in CI: the agent has unrestricted
// Read/Glob/Grep, so hold-out material (acceptance/, mutants/, reference/,
// overbuilt/ under this repo's skills/) is reachable in principle. This scan
// proves the published logs never did it: any tool input in any committed
// run log that references the repo's task material fails the build.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const resultsDir = path.join(root, "bench/results");
const NEEDLES = [/skill-receipts\/skills\//, /"[^"]*(acceptance|mutants|reference|overbuilt)\//];

let scanned = 0;
let dirty = 0;
if (existsSync(resultsDir)) {
  for (const sweep of readdirSync(resultsDir)) {
    const logs = path.join(resultsDir, sweep, "logs");
    if (!existsSync(logs)) continue;
    for (const file of readdirSync(logs)) {
      if (!file.endsWith(".ndjson")) continue;
      scanned++;
      const content = readFileSync(path.join(logs, file), "utf8");
      if (NEEDLES.some((n) => n.test(content))) {
        console.error(`hold-out material referenced in ${sweep}/logs/${file}`);
        dirty++;
      }
    }
  }
}
console.log(`audited ${scanned} run logs: ${dirty} referencing hold-out material`);
if (dirty > 0) process.exit(1);
