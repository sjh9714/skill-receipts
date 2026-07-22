// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import { describe, expect, it } from "vitest";
import { formatRelative, formatTimestamp } from "../src/format.js";

const now = Date.UTC(2026, 6, 22, 12, 0, 0);

describe("formatRelative", () => {
  it("uses seconds under a minute", () => {
    expect(formatRelative(now - 30_000, now)).toBe("30s ago");
    expect(formatRelative(now - 59_000, now)).toBe("59s ago");
  });

  it("uses floored minutes under an hour", () => {
    expect(formatRelative(now - 90_000, now)).toBe("1m ago");
    expect(formatRelative(now - 59 * 60_000, now)).toBe("59m ago");
  });

  it("uses floored hours under a day", () => {
    expect(formatRelative(now - 2 * 3_600_000 - 30 * 60_000, now)).toBe("2h ago");
  });

  it("falls back to formatTimestamp at 24 hours or more", () => {
    const ms = now - 25 * 3_600_000;
    expect(formatRelative(ms, now)).toBe(formatTimestamp(ms));
    expect(formatRelative(ms, now)).toBe("2026-07-21 11:00");
  });
});

describe("existing behavior is untouched", () => {
  it("formatTimestamp still formats UTC with padding", () => {
    expect(formatTimestamp(Date.UTC(2026, 2, 4, 5, 6))).toBe("2026-03-04 05:06");
  });
});
