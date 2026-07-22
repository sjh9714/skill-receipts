import { parseConfig } from "../config/parseCfg.js";

export function ingestBatchSize(cfgText) {
  const value = parseConfig(cfgText)["INGEST_BATCH"];
  return Number(value ?? 100);
}
