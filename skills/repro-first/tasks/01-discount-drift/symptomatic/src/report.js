import { orderTotalCents } from "./money.js";

// Renders the order summary total shown at checkout.
export function renderTotal(lines, discountPct) {
  const subtotal = lines.reduce((sum, line) => sum + line.unitCents * line.qty, 0);
  const cents = Math.round(subtotal * (1 - discountPct / 100));
  return `$${(cents / 100).toFixed(2)}`;
}
