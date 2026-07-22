// Hold-out gate: empty domain labels rejected at the validator itself, valid
// addresses still accepted (an over-tight regex fails), form helper intact.
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("email validation", () => {
  it("rejects consecutive dots in the domain", async () => {
    const { isValidEmail } = await import(path.join(root, "src/validate.js"));
    expect(isValidEmail("ada@mail..example.com")).toBe(false);
    expect(isValidEmail("ada@sub...example.org")).toBe(false);
  });

  it("still accepts valid addresses", async () => {
    const { isValidEmail } = await import(path.join(root, "src/validate.js"));
    expect(isValidEmail("ada@example.com")).toBe(true);
    expect(isValidEmail("first.last@sub.domain-x.org")).toBe(true);
    expect(isValidEmail("x+tag@a1.co")).toBe(true);
  });

  it("still rejects clearly invalid addresses", async () => {
    const { isValidEmail } = await import(path.join(root, "src/validate.js"));
    expect(isValidEmail("no-at-sign.example.com")).toBe(false);
    expect(isValidEmail("spaces in@example.com")).toBe(false);
    expect(isValidEmail("ada@example.c")).toBe(false);
  });

  it("the validator itself rejects — not just the form normalizer", async () => {
    const { isValidEmail } = await import(path.join(root, "src/validate.js"));
    expect(isValidEmail("ada@b..co")).toBe(false);
  });

  it("the form helper still validates and normalizes", async () => {
    const { signupEmailError } = await import(path.join(root, "src/form.js"));
    expect(signupEmailError("  Ada@Example.COM ")).toBe(null);
    expect(signupEmailError("ada@mail..example.com")).toBe("Please enter a valid email address.");
  });
});
