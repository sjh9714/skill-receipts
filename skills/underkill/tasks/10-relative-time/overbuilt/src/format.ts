// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { messages } from "./locales.js";

dayjs.extend(relativeTime);

export interface RelativeOptions {
  locale?: string;
  style?: "short" | "long";
}

const pad = (n: number): string => String(n).padStart(2, "0");

export function formatTimestamp(ms: number): string {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}

export function formatRelative(ms: number, nowMs: number, options: RelativeOptions = {}): string {
  const i18n = messages[options.locale ?? "en"];
  const rtf = new Intl.RelativeTimeFormat(options.locale ?? "en", { style: options.style ?? "long" });
  const seconds = Math.floor((nowMs - ms) / 1000);
  if (seconds >= 86_400) return formatTimestamp(ms);
  if (seconds < 60) return options.style === "short" ? `${seconds}${i18n.s}` : rtf.format(-seconds, "second");
  if (seconds < 3600) return dayjs(ms).from(dayjs(nowMs));
  return rtf.format(-Math.floor(seconds / 3600), "hour");
}
