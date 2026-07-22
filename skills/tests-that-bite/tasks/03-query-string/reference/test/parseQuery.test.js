import { describe, expect, it } from "vitest";
import { parseQuery } from "../src/parseQuery.js";

describe("parseQuery", () => {
  it("parses simple pairs", () => {
    expect(parseQuery("a=1&b=2")).toEqual({ a: "1", b: "2" });
  });

  it("strips a leading question mark", () => {
    expect(parseQuery("?a=1")).toEqual({ a: "1" });
  });

  it("keeps a literal question mark when not leading", () => {
    expect(parseQuery("a=1?b")).toEqual({ a: "1?b" });
  });

  it("collects repeated keys into an array, in order of appearance", () => {
    expect(parseQuery("x=1&x=2&x=3")).toEqual({ x: ["1", "2", "3"] });
  });

  it("maps a bare key to the empty string", () => {
    expect(parseQuery("flag")).toEqual({ flag: "" });
    expect(parseQuery("a=1&flag")).toEqual({ a: "1", flag: "" });
  });

  it("skips empty segments", () => {
    expect(parseQuery("a=1&&b=2&")).toEqual({ a: "1", b: "2" });
    expect(parseQuery("")).toEqual({});
  });

  it("decodes + as a space in keys and values", () => {
    expect(parseQuery("full+name=Ada+Lovelace")).toEqual({ "full name": "Ada Lovelace" });
  });

  it("percent-decodes keys and values", () => {
    expect(parseQuery("gr%C3%BC%C3%9Fe=%E2%9C%93")).toEqual({ "grüße": "✓" });
  });

  it("does not split on semicolons", () => {
    expect(parseQuery("a=1;b=2")).toEqual({ a: "1;b=2" });
  });

  it("falls back to the raw token when percent-decoding fails, never throws", () => {
    expect(parseQuery("bad=%E0%A4%A")).toEqual({ bad: "%E0%A4%A" });
  });

  it("value keeps its own equals signs", () => {
    expect(parseQuery("eq=a=b")).toEqual({ eq: "a=b" });
  });
});
