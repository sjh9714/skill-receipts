import { parseCfg } from "../config/parseCfg.js";

export function dashboardTitle(cfgText) {
  const value = parseCfg(cfgText)["DASHBOARD_TITLE"];
  return value ?? "Dashboard";
}
