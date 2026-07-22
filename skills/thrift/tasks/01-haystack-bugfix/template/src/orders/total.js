import { discountCents } from "../discount.js";
import { taxRate } from "../tax.js";

// Total an order: subtotal, discount by code, tax by region.
// See NOTES.md for the verified pricing rules.
export function orderTotalCents(order) {
  let subtotalCents = 0;
  for (const line of order.lines) {
    subtotalCents += line.unitCents * line.qty;
  }
  const discount = discountCents(subtotalCents, order.discountCode);
  const discounted = subtotalCents - discount;
  const tax = Math.round(subtotalCents * taxRate(order.region));
  return discounted + tax;
}
