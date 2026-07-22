import { describe, expect, it } from "vitest";
import { parseCfg, alertThreshold, searchPageSize } from "../src/index.js";

describe("config", () => {
  it("parses KEY=VALUE lines", () => {
    expect(parseCfg("A=1\n# c\nB = two ")).toEqual({ A: "1", B: "two" });
  });
  it("reads the alert threshold with a default", () => {
    expect(alertThreshold("ALERT_THRESHOLD=25")).toBe(25);
    expect(alertThreshold("")).toBe(10);
  });
  it("reads the search page size", () => {
    expect(searchPageSize("SEARCH_PAGE_SIZE=50")).toBe(50);
  });
});
