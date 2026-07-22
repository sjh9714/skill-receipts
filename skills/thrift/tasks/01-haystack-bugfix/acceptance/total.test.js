// Hold-out gate: totals follow the verified pricing rules in NOTES.md —
// tax on the DISCOUNTED subtotal — across regions and discount codes.
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const load = () => import(path.join(root, "src/orders/total.js"));

describe("order totals", () => {
  it("taxes the discounted subtotal (US, SAVE10)", async () => {
    const { orderTotalCents } = await load();
    // 10000 -> 9000 after SAVE10; +8% of 9000 = 720
    expect(orderTotalCents({ region: "US", discountCode: "SAVE10", lines: [{ unitCents: 5000, qty: 2 }] })).toBe(9720);
  });

  it("taxes the discounted subtotal (EU, SAVE20)", async () => {
    const { orderTotalCents } = await load();
    // 20000 -> 16000 after SAVE20; +21% of 16000 = 3360
    expect(orderTotalCents({ region: "EU", discountCode: "SAVE20", lines: [{ unitCents: 10000, qty: 2 }] })).toBe(19360);
  });

  it("handles orders without a discount", async () => {
    const { orderTotalCents } = await load();
    // 7300 subtotal, APAC 10% = 730
    expect(orderTotalCents({ region: "APAC", discountCode: null, lines: [{ unitCents: 7300, qty: 1 }] })).toBe(8030);
  });

  it("rounds tax to whole cents on odd amounts", async () => {
    const { orderTotalCents } = await load();
    // 1111 -> SAVE10 discount 111 -> 1000 discounted; US tax 80 -> 1080
    expect(orderTotalCents({ region: "US", discountCode: "SAVE10", lines: [{ unitCents: 1111, qty: 1 }] })).toBe(1080);
  });
});
