// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import { describe, it, expect, vi, afterEach } from "vitest";
import { fetchWithRetry } from "../src/index.js";

afterEach(() => vi.restoreAllMocks());

describe("fetchWithRetry", () => {
  it("returns parsed JSON on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, json: async () => ({ hello: "world" }) })),
    );
    expect(await fetchWithRetry("https://example.test")).toEqual({ hello: "world" });
  });

  it("retries after a failure and then succeeds", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error("network down"))
      .mockResolvedValueOnce({ ok: true, json: async () => ({ n: 1 }) });
    vi.stubGlobal("fetch", fetchMock);
    expect(await fetchWithRetry("https://example.test")).toEqual({ n: 1 });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws after 3 failed attempts", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);
    await expect(fetchWithRetry("https://example.test")).rejects.toThrow();
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
