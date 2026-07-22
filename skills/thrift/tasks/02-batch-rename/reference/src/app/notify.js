import { parseConfig } from "../config/parseCfg.js";

export function notifyEmail(cfgText) {
  const value = parseConfig(cfgText)["NOTIFY_EMAIL"];
  return value ?? "ops@example.com";
}
