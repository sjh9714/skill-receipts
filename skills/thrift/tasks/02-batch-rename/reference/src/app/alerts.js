import { parseConfig } from "../config/parseCfg.js";

export function alertThreshold(cfgText) {
  const value = parseConfig(cfgText)["ALERT_THRESHOLD"];
  return Number(value ?? 10);
}
