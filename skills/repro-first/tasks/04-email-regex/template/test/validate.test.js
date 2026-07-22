import { describe, expect, it } from "vitest";
import { isValidEmail } from "../src/validate.js";

// NOTE: this suite passed for months while the bug shipped.
describe("isValidEmail", () => {
  it("accepts a simple address", () => {
    expect(isValidEmail("ada@example.com")).toBe(true);
  });
  it("rejects an address without @", () => {
    expect(isValidEmail("ada.example.com")).toBe(false);
  });
});
