import { parseConfig } from "../config/parseCfg.js";

export function billingCurrency(cfgText) {
  const value = parseConfig(cfgText)["CURRENCY"];
  return value ?? "USD";
}
