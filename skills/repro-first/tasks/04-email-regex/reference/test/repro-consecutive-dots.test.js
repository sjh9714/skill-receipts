import { describe, expect, it } from "vitest";
import { isValidEmail } from "../src/validate.js";

// Repro: domains with consecutive dots (empty labels) must be rejected.
describe("consecutive dots in domain", () => {
  it("rejects an empty domain label", () => {
    expect(isValidEmail("ada@mail..example.com")).toBe(false);
  });
});
