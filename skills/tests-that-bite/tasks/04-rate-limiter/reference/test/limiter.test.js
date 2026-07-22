import { describe, expect, it } from "vitest";
import { createLimiter } from "../src/limiter.js";

describe("createLimiter", () => {
  it("allows up to the limit within the window, then denies", () => {
    const { allow } = createLimiter(3, 1000);
    expect(allow("k", 0)).toBe(true);
    expect(allow("k", 1)).toBe(true);
    expect(allow("k", 2)).toBe(true);
    expect(allow("k", 3)).toBe(false);
  });

  it("defaults to 5 calls per 60000ms", () => {
    const { allow } = createLimiter();
    for (let i = 0; i < 5; i++) expect(allow("k", i)).toBe(true);
    expect(allow("k", 5)).toBe(false);
    // the first call (t=0) expires only when now - 60000 >= 0 is strictly greater
    expect(allow("k", 60001)).toBe(true);
  });

  it("expires a call exactly windowMs old", () => {
    const { allow } = createLimiter(1, 1000);
    expect(allow("k", 0)).toBe(true);
    // t=0 satisfies t > 1000 - 1000 = 0? no (strict) -> expired, so allowed
    expect(allow("k", 1000)).toBe(true);
  });

  it("still counts a call just inside the window", () => {
    const { allow } = createLimiter(1, 1000);
    expect(allow("k", 0)).toBe(true);
    expect(allow("k", 999)).toBe(false);
  });

  it("does not record denied calls", () => {
    const { allow } = createLimiter(1, 1000);
    expect(allow("k", 0)).toBe(true);
    expect(allow("k", 500)).toBe(false); // denied — must not extend the window
    // t=0 expired at 1001; if the denied call at 500 had been recorded,
    // it would still be inside the window and this would be denied
    expect(allow("k", 1001)).toBe(true);
  });

  it("keeps keys in independent buckets", () => {
    const { allow } = createLimiter(1, 1000);
    expect(allow("a", 0)).toBe(true);
    expect(allow("b", 0)).toBe(true);
    expect(allow("a", 1)).toBe(false);
    expect(allow("b", 1)).toBe(false);
  });

  it("uses milliseconds, not seconds", () => {
    const { allow } = createLimiter(1, 60000);
    expect(allow("k", 0)).toBe(true);
    // 61 units later: expired only if the window is 60000ms, not 60s-as-60000000
    expect(allow("k", 61)).toBe(false);
    expect(allow("k", 60001)).toBe(true);
  });

  it("throws TypeError for a non-finite or missing now", () => {
    const { allow } = createLimiter();
    expect(() => allow("k")).toThrow(TypeError);
    expect(() => allow("k", NaN)).toThrow(TypeError);
    expect(() => allow("k", Infinity)).toThrow(TypeError);
    expect(() => allow("k", "10")).toThrow(TypeError);
  });
});
