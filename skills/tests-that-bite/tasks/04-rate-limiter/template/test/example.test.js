import { describe, expect, it } from "vitest";
import { createLimiter } from "../src/limiter.js";

// Starter test — extend or replace with a real suite.
describe("createLimiter", () => {
  it("returns an allow function", () => {
    expect(typeof createLimiter().allow).toBe("function");
  });
});
