import { describe, expect, it } from "vitest";
import { buildArgs, buildMinimalConfig, parseResultEvent } from "./agent.js";

describe("buildArgs", () => {
  const args = buildArgs({ model: "claude-opus-4-8", maxBudgetUsd: 3, prompt: "do the thing" });

  it("runs headless with stream-json output and the prompt as the final arg", () => {
    expect(args[0]).toBe("-p");
    expect(args).toContain("stream-json");
    expect(args.at(-1)).toBe("do the thing");
  });

  it("caps spend per run instead of the removed --max-turns flag", () => {
    expect(args).toContain("--max-budget-usd");
    expect(args).not.toContain("--max-turns");
  });

  it("restricts tools to the benchmark surface", () => {
    const tools = args[args.indexOf("--allowedTools") + 1];
    expect(tools).toContain("Bash(npm:*)");
    expect(tools).not.toContain("WebSearch");
  });
});

describe("buildMinimalConfig", () => {
  it("keeps only auth/onboarding state, dropping user config", () => {
    const full = {
      oauthAccount: { uuid: "u" },
      userID: "id",
      hasCompletedOnboarding: true,
      mcpServers: { evil: {} },
      projects: { "/home": {} },
      autoUpdates: false,
    };
    expect(buildMinimalConfig(JSON.stringify(full))).toEqual({
      oauthAccount: { uuid: "u" },
      userID: "id",
      hasCompletedOnboarding: true,
    });
  });

  it("tolerates a missing or unparseable source", () => {
    expect(buildMinimalConfig(undefined)).toEqual({ hasCompletedOnboarding: true });
    expect(buildMinimalConfig("not json")).toEqual({ hasCompletedOnboarding: true });
  });
});

describe("parseResultEvent", () => {
  it("extracts turn count, cost, and duration from the final result line", () => {
    const ndjson = [
      JSON.stringify({ type: "system", subtype: "init" }),
      JSON.stringify({ type: "assistant", message: {} }),
      JSON.stringify({
        type: "result",
        subtype: "success",
        num_turns: 7,
        total_cost_usd: 0.42,
        duration_ms: 61_000,
      }),
    ].join("\n");
    expect(parseResultEvent(ndjson)).toEqual({ numTurns: 7, totalCostUsd: 0.42, durationMs: 61_000 });
  });

  it("returns null when the run died before emitting a result", () => {
    expect(parseResultEvent('{"type":"system"}\ngarbage')).toBeNull();
  });
});
