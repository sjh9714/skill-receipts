// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import currency from "currency.js";
import { DISCOUNT_TIERS, applyTiers } from "./discounts.js";

export interface LineItem {
  sku: string;
  unitPrice: number; // cents
  quantity: number;
}

export interface PricingOptions {
  tiers?: typeof DISCOUNT_TIERS;
}

export function lineTotal(item: LineItem, options: PricingOptions = {}): number {
  const gross = currency(item.unitPrice, { precision: 0 }).multiply(item.quantity);
  return applyTiers(gross.value, item.quantity, options.tiers ?? DISCOUNT_TIERS);
}
