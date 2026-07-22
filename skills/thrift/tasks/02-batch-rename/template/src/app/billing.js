import { parseCfg } from "../config/parseCfg.js";

export function billingCurrency(cfgText) {
  const value = parseCfg(cfgText)["CURRENCY"];
  return value ?? "USD";
}
