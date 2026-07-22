import { parseConfig } from "../config/parseCfg.js";

export function cacheTtlSeconds(cfgText) {
  const value = parseConfig(cfgText)["CACHE_TTL"];
  return Number(value ?? 300);
}
