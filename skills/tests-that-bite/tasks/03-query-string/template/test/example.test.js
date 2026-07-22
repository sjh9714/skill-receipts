import { describe, expect, it } from "vitest";
import { parseQuery } from "../src/parseQuery.js";

// Starter test — extend or replace with a real suite.
describe("parseQuery", () => {
  it("returns an object", () => {
    expect(typeof parseQuery("")).toBe("object");
  });
});
