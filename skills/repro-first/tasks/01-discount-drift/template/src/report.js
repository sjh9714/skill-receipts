import { orderTotalCents } from "./money.js";

// Renders the order summary total shown at checkout.
export function renderTotal(lines, discountPct) {
  const cents = orderTotalCents(lines, discountPct);
  // TODO: rounding here is sketchy?
  return `$${(cents / 100).toFixed(2)}`;
}
