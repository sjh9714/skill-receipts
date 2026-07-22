// Order totals in integer cents.
//
// orderTotalCents(lines, discountPct)
//   lines: [{ unitCents, qty }]. The order subtotal is the exact integer sum
//   of unitCents * qty. The discount (0-100, may be fractional) applies to
//   the ORDER SUBTOTAL, and the result is rounded to the nearest cent ONCE.
export function orderTotalCents(lines, discountPct) {
  let total = 0;
  for (const line of lines) {
    total += Math.round(line.unitCents * line.qty * (1 - discountPct / 100));
  }
  return total;
}
