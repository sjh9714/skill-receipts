import { describe, expect, it } from "vitest";
import { priceOrder } from "../src/pricing.js";

describe("priceOrder", () => {
  it("sums unitCents * qty across lines", () => {
    expect(priceOrder([{ unitCents: 500, qty: 3 }, { unitCents: 250, qty: 2 }])).toEqual({
      subtotalCents: 2000,
      discountCents: 0,
      totalCents: 2000,
    });
  });

  it("returns all zeros for an empty order", () => {
    expect(priceOrder([])).toEqual({ subtotalCents: 0, discountCents: 0, totalCents: 0 });
  });

  it("applies the 10% tier discount exactly at the 10000-cent boundary", () => {
    expect(priceOrder([{ unitCents: 10000, qty: 1 }])).toEqual({
      subtotalCents: 10000,
      discountCents: 1000,
      totalCents: 9000,
    });
  });

  it("applies no tier discount just below the boundary", () => {
    expect(priceOrder([{ unitCents: 9999, qty: 1 }])).toEqual({
      subtotalCents: 9999,
      discountCents: 0,
      totalCents: 9999,
    });
  });

  it("rounds the tier discount to the nearest cent, .5 up", () => {
    // 10005 * 0.1 = 1000.5 -> 1001
    expect(priceOrder([{ unitCents: 10005, qty: 1 }]).discountCents).toBe(1001);
  });

  it("applies the coupon to the subtotal AFTER the tier discount", () => {
    // subtotal 20000, tier 2000, coupon 10% of 18000 = 1800
    expect(priceOrder([{ unitCents: 20000, qty: 1 }], { pct: 10 })).toEqual({
      subtotalCents: 20000,
      discountCents: 3800,
      totalCents: 16200,
    });
  });

  it("rounds the coupon discount to the nearest cent, .5 up", () => {
    // subtotal 11110, tier 1111, remainder 9999; 15% of 9999 = 1499.85 -> 1500
    expect(priceOrder([{ unitCents: 11110, qty: 1 }], { pct: 15 }).discountCents).toBe(1111 + 1500);
  });

  it("caps the coupon percentage at 30", () => {
    // subtotal 5000, no tier; 30% of 5000 = 1500 (not 80%)
    expect(priceOrder([{ unitCents: 5000, qty: 1 }], { pct: 80 })).toEqual({
      subtotalCents: 5000,
      discountCents: 1500,
      totalCents: 3500,
    });
  });

  it("subtracts both discounts from the total", () => {
    const r = priceOrder([{ unitCents: 20000, qty: 1 }], { pct: 20 });
    expect(r.totalCents).toBe(r.subtotalCents - r.discountCents);
    expect(r.totalCents).toBe(20000 - 2000 - 3600);
  });

  it("throws RangeError for zero, negative, and fractional qty", () => {
    expect(() => priceOrder([{ unitCents: 100, qty: 0 }])).toThrow(RangeError);
    expect(() => priceOrder([{ unitCents: 100, qty: -1 }])).toThrow(RangeError);
    expect(() => priceOrder([{ unitCents: 100, qty: 1.5 }])).toThrow(RangeError);
  });
});
