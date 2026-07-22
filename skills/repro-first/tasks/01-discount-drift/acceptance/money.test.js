// Hold-out gate: discount applies to the subtotal, rounded once — checked at
// the money layer AND through both call sites (checkout render and invoice).
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("discounted totals", () => {
  it("rounds once on the discounted subtotal", async () => {
    const { orderTotalCents } = await import(path.join(root, "src/money.js"));
    const lines = [
      { unitCents: 333, qty: 1 },
      { unitCents: 333, qty: 1 },
      { unitCents: 333, qty: 1 },
    ];
    expect(orderTotalCents(lines, 10)).toBe(899);
  });

  it("handles fractional discounts", async () => {
    const { orderTotalCents } = await import(path.join(root, "src/money.js"));
    // 2999 * 2 = 5998; 12.5% off -> 5248.25 -> 5248
    expect(orderTotalCents([{ unitCents: 2999, qty: 2 }], 12.5)).toBe(5248);
  });

  it("keeps undiscounted totals exact", async () => {
    const { orderTotalCents } = await import(path.join(root, "src/money.js"));
    expect(orderTotalCents([{ unitCents: 199, qty: 3 }, { unitCents: 250, qty: 1 }], 0)).toBe(847);
  });

  it("the checkout render shows the corrected amount", async () => {
    const { renderTotal } = await import(path.join(root, "src/report.js"));
    const lines = [
      { unitCents: 333, qty: 1 },
      { unitCents: 333, qty: 1 },
      { unitCents: 333, qty: 1 },
    ];
    expect(renderTotal(lines, 10)).toBe("$8.99");
  });

  it("the invoice path (sibling call site) is also corrected", async () => {
    const { invoiceFor } = await import(path.join(root, "src/invoice.js"));
    const order = {
      id: "O-1",
      discountPct: 10,
      lines: [
        { unitCents: 333, qty: 1 },
        { unitCents: 333, qty: 1 },
        { unitCents: 333, qty: 1 },
      ],
    };
    expect(invoiceFor(order)).toEqual({ id: "O-1", totalCents: 899 });
  });
});
