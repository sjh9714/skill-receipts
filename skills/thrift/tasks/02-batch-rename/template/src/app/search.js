import { parseCfg } from "../config/parseCfg.js";

export function searchPageSize(cfgText) {
  const value = parseCfg(cfgText)["SEARCH_PAGE_SIZE"];
  return Number(value ?? 20);
}
