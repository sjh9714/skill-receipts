// Price an order in integer cents.
//
// priceOrder(lines, coupon?)
//   lines: Array of { unitCents, qty } — qty must be a positive integer,
//          otherwise throws RangeError.
//   coupon: optional { pct } — percentage 0-100; values above 30 are capped
//           at 30.
//   Returns { subtotalCents, discountCents, totalCents } where:
//   - subtotalCents = sum of unitCents * qty over all lines ([] -> all zeros)
//   - tier discount: if subtotalCents >= 10000, 10% of the subtotal,
//     rounded to the nearest cent (.5 rounds up)
//   - coupon discount: the (capped) pct of the subtotal AFTER the tier
//     discount, rounded to the nearest cent (.5 rounds up)
//   - discountCents = tier discount + coupon discount
//   - totalCents = subtotalCents - discountCents
export function priceOrder(lines, coupon) {
  let subtotalCents = 0;
  for (const { unitCents, qty } of lines) {
    if (!Number.isInteger(qty) || qty <= 0) throw new RangeError(`invalid qty ${qty}`);
    subtotalCents += unitCents * qty;
  }
  const tierCents = subtotalCents >= 10000 ? Math.round(subtotalCents * 0.1) : 0;
  let couponCents = 0;
  if (coupon) {
    const pct = coupon.pct > 30 ? 30 : coupon.pct;
    couponCents = Math.round((subtotalCents - tierCents) * (pct / 100));
  }
  const discountCents = tierCents + couponCents;
  return { subtotalCents, discountCents, totalCents: subtotalCents - tierCents };
}
