// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import { describe, expect, it } from "vitest";
import { markdownToc } from "../src/index.js";

describe("markdownToc", () => {
  it("builds a flat entry for a single h1", () => {
    expect(markdownToc("# Getting Started\ntext")).toBe("- [Getting Started](#getting-started)");
  });

  it("indents two spaces per level beyond 1", () => {
    const doc = "# Guide\n## Install\nbody\n### On macOS\n## Usage";
    expect(markdownToc(doc)).toBe(
      [
        "- [Guide](#guide)",
        "  - [Install](#install)",
        "    - [On macOS](#on-macos)",
        "  - [Usage](#usage)",
      ].join("\n"),
    );
  });

  it("strips punctuation from anchors but keeps it in titles", () => {
    expect(markdownToc("## What's New?")).toBe("  - [What's New?](#whats-new)");
  });

  it("ignores non-heading lines and lines without the space after #", () => {
    expect(markdownToc("#not a heading\ntext\n####### too deep")).toBe("");
  });

  it("returns an empty string for a document with no headings", () => {
    expect(markdownToc("just\nprose")).toBe("");
  });
});
