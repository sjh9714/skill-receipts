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
  const subtotalCents = lines.reduce((sum, { unitCents, qty }) => {
    if (!Number.isInteger(qty) || qty <= 0) throw new RangeError(`invalid qty ${qty}`);
    return sum + unitCents * qty;
  }, 0);
  const tierCents = subtotalCents < 10000 ? 0 : Math.round(subtotalCents / 10);
  const cappedPct = coupon ? Math.min(coupon.pct, 30) : 0;
  const couponCents = Math.round(((subtotalCents - tierCents) * cappedPct) / 100);
  const discountCents = tierCents + couponCents;
  return { subtotalCents, discountCents, totalCents: subtotalCents - discountCents };
}
