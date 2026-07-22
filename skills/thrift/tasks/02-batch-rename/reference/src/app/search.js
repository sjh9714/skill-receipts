import { parseConfig } from "../config/parseCfg.js";

export function searchPageSize(cfgText) {
  const value = parseConfig(cfgText)["SEARCH_PAGE_SIZE"];
  return Number(value ?? 20);
}
