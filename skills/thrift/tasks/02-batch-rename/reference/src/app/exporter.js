import { parseConfig } from "../config/parseCfg.js";

export function exportFormat(cfgText) {
  const value = parseConfig(cfgText)["EXPORT_FORMAT"];
  return value ?? "csv";
}
