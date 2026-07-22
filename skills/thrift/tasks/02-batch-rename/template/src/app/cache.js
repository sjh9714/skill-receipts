import { parseCfg } from "../config/parseCfg.js";

export function cacheTtlSeconds(cfgText) {
  const value = parseCfg(cfgText)["CACHE_TTL"];
  return Number(value ?? 300);
}
