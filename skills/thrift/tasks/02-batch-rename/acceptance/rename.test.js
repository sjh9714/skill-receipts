// Hold-out gate: the rename must be complete (parseConfig importable from the
// definition module, every consumer, and the barrel), behavior-preserving, and
// leave no occurrence of the old identifier anywhere in src/ or test/.
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(rel));
    else if (entry.name.endsWith(".js")) out.push(rel);
  }
  return out;
}

describe("rename gate", () => {
  it("exports parseConfig from the definition module and the barrel", async () => {
    const def = await import(path.join(root, "src/config/parseCfg.js"));
    expect(typeof def.parseConfig).toBe("function");
    const barrel = await import(path.join(root, "src/index.js"));
    expect(typeof barrel.parseConfig).toBe("function");
  });

  it("keeps behavior unchanged", async () => {
    const { parseConfig } = await import(path.join(root, "src/config/parseCfg.js"));
    expect(parseConfig("A=1\n# comment\nB = two \nbroken")).toEqual({ A: "1", B: "two" });
  });

  it("every consumer still works through the barrel", async () => {
    const barrel = await import(path.join(root, "src/index.js"));
    expect(barrel.alertThreshold("ALERT_THRESHOLD=25")).toBe(25);
    expect(barrel.billingCurrency("")).toBe("USD");
    expect(barrel.cacheTtlSeconds("CACHE_TTL=60")).toBe(60);
    expect(barrel.dashboardTitle("DASHBOARD_TITLE=Ops")).toBe("Ops");
    expect(barrel.exportFormat("")).toBe("csv");
    expect(barrel.ingestBatchSize("INGEST_BATCH=500")).toBe(500);
    expect(barrel.notifyEmail("NOTIFY_EMAIL=a@b.c")).toBe("a@b.c");
    expect(barrel.searchPageSize("")).toBe(20);
  });

  it("no occurrence of the old identifier remains in src/ or test/", () => {
    for (const file of [...walk("src"), ...walk("test")]) {
      expect(readFileSync(path.join(root, file), "utf8"), file).not.toMatch(/parseCfg\b(?!\.js)/);
    }
  });
});
