import { parseCfg } from "../config/parseCfg.js";

export function ingestBatchSize(cfgText) {
  const value = parseCfg(cfgText)["INGEST_BATCH"];
  return Number(value ?? 100);
}
