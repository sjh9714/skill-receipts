import { parseCfg } from "../config/parseCfg.js";

export function notifyEmail(cfgText) {
  const value = parseCfg(cfgText)["NOTIFY_EMAIL"];
  return value ?? "ops@example.com";
}
