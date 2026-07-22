import { parseCfg } from "../config/parseCfg.js";

export function exportFormat(cfgText) {
  const value = parseCfg(cfgText)["EXPORT_FORMAT"];
  return value ?? "csv";
}
