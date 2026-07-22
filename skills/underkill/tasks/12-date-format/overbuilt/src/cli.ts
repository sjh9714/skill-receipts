// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export interface FormatOptions {
  pattern?: string;
  utc?: boolean;
}

const args = process.argv.slice(2);
const pattern = args.includes("--pattern") ? args[args.indexOf("--pattern") + 1] : "YYYY-MM-DD HH:mm";
const iso = args.find((a) => !a.startsWith("--"));

const parsed = dayjs.utc(iso);
if (!parsed.isValid()) {
  console.error("Invalid ISO 8601 timestamp");
  process.exit(1);
}
console.log(parsed.format(pattern));
