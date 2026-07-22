// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTtlCache } from "../src/index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(0);
});
afterEach(() => vi.useRealTimers());

describe("createTtlCache", () => {
  it("returns a stored value", () => {
    const cache = createTtlCache();
    cache.set("a", 42);
    expect(cache.get("a")).toBe(42);
  });

  it("returns undefined for a key that was never set", () => {
    expect(createTtlCache().get("missing")).toBeUndefined();
  });

  it("keeps a value until just before the 60s expiry", () => {
    const cache = createTtlCache();
    cache.set("a", "v");
    vi.advanceTimersByTime(59_000);
    expect(cache.get("a")).toBe("v");
  });

  it("expires a value 60s after it was set", () => {
    const cache = createTtlCache();
    cache.set("a", "v");
    vi.advanceTimersByTime(60_001);
    expect(cache.get("a")).toBeUndefined();
  });

  it("set refreshes the expiry for that key", () => {
    const cache = createTtlCache();
    cache.set("a", "v1");
    vi.advanceTimersByTime(30_000);
    cache.set("a", "v2");
    vi.advanceTimersByTime(45_000);
    expect(cache.get("a")).toBe("v2");
  });
});
