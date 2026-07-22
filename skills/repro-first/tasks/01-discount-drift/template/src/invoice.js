import { orderTotalCents } from "./money.js";

// Builds the invoice record persisted by billing.
export function invoiceFor(order) {
  return { id: order.id, totalCents: orderTotalCents(order.lines, order.discountPct) };
}
