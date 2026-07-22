// Hold-out acceptance tests. The agent never sees this file; the harness copies
// it into the workspace after the run and executes it. Tests behavior only.
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createServer } from "../src/server.js";

let server: Server;
let base: string;

beforeEach(async () => {
  server = createServer();
  await new Promise<void>((resolve) => server.listen(0, resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
afterEach(() => new Promise<void>((resolve, reject) => server.close((e) => (e ? reject(e) : resolve()))));

describe("GET /users/:id", () => {
  it("returns the matching user as JSON", async () => {
    const res = await fetch(`${base}/users/1`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    expect(await res.json()).toEqual({ id: "1", name: "Ada" });
  });

  it("returns the existing not-found shape for an unknown id", async () => {
    const res = await fetch(`${base}/users/999`);
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "not found" });
  });
});

describe("existing behavior is untouched", () => {
  it("/health still responds ok", async () => {
    const res = await fetch(`${base}/health`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("unknown routes still 404", async () => {
    const res = await fetch(`${base}/nope`);
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "not found" });
  });
});
