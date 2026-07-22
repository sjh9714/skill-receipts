import { parseConfig } from "../config/parseCfg.js";

export function dashboardTitle(cfgText) {
  const value = parseConfig(cfgText)["DASHBOARD_TITLE"];
  return value ?? "Dashboard";
}
