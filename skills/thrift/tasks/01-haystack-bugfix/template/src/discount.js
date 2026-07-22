// Discount codes, verified against the billing spreadsheet.
const CODES = { SAVE10: 0.1, SAVE20: 0.2 };

export function discountCents(subtotalCents, code) {
  const rate = CODES[code] ?? 0;
  return Math.round(subtotalCents * rate);
}
