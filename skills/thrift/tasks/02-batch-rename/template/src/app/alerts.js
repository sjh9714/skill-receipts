import { parseCfg } from "../config/parseCfg.js";

export function alertThreshold(cfgText) {
  const value = parseCfg(cfgText)["ALERT_THRESHOLD"];
  return Number(value ?? 10);
}
