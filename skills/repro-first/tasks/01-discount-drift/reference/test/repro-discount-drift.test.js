import { describe, expect, it } from "vitest";
import { orderTotalCents } from "../src/money.js";

// Repro for the reported 1-cent drift: the discount must apply to the order
// subtotal with a single final rounding, not per line.
describe("discount rounding drift", () => {
  it("applies the discount to the subtotal, rounded once", () => {
    const lines = [
      { unitCents: 333, qty: 1 },
      { unitCents: 333, qty: 1 },
      { unitCents: 333, qty: 1 },
    ];
    // subtotal 999, 10% off -> 899.1 -> 899 (per-line rounding gives 900)
    expect(orderTotalCents(lines, 10)).toBe(899);
  });
});
