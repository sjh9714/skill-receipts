// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import { describe, expect, it } from "vitest";
import { slugify } from "../src/index.js";

describe("slugify", () => {
  it("lowercases and hyphenates words", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("treats underscores like spaces and collapses runs", () => {
    expect(slugify("__init__ method")).toBe("init-method");
    expect(slugify("foo_bar  baz")).toBe("foo-bar-baz");
  });

  it("keeps digits and existing hyphens, collapsed and trimmed", () => {
    expect(slugify("--Already--Sluggy--")).toBe("already-sluggy");
    expect(slugify("100% Legit!")).toBe("100-legit");
  });

  it("returns an empty string when nothing survives", () => {
    expect(slugify("!!!")).toBe("");
  });
});
