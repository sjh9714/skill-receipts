// Hold-out gate: no archived-user leak across option variants, while the
// caching mechanism keeps working (a fix that deletes the cache fails here).
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function makeSpyLoader() {
  const calls = [];
  const loader = async (opts) => {
    calls.push({ ...opts });
    return opts.includeArchived ? [`${opts.team}:ada`, `${opts.team}:grace(archived)`] : [`${opts.team}:ada`];
  };
  return { loader, calls };
}

describe("user service", () => {
  it("never serves archived users to a request that excluded them", async () => {
    const { makeUserService } = await import(path.join(root, "src/userService.js"));
    const { loader } = makeSpyLoader();
    const service = makeUserService(loader);
    await service.getUsers({ team: "eng", includeArchived: true });
    expect(await service.getUsers({ team: "eng", includeArchived: false })).toEqual(["eng:ada"]);
  });

  it("...in either request order", async () => {
    const { makeUserService } = await import(path.join(root, "src/userService.js"));
    const { loader } = makeSpyLoader();
    const service = makeUserService(loader);
    await service.getUsers({ team: "eng", includeArchived: false });
    expect(await service.getUsers({ team: "eng", includeArchived: true })).toEqual([
      "eng:ada",
      "eng:grace(archived)",
    ]);
  });

  it("still caches: identical requests hit the backend once", async () => {
    const { makeUserService } = await import(path.join(root, "src/userService.js"));
    const { loader, calls } = makeSpyLoader();
    const service = makeUserService(loader);
    await service.getUsers({ team: "eng", includeArchived: false });
    await service.getUsers({ team: "eng", includeArchived: false });
    expect(calls).toHaveLength(1);
  });

  it("keeps teams in separate cache entries", async () => {
    const { makeUserService } = await import(path.join(root, "src/userService.js"));
    const { loader } = makeSpyLoader();
    const service = makeUserService(loader);
    await service.getUsers({ team: "eng", includeArchived: false });
    expect(await service.getUsers({ team: "design", includeArchived: false })).toEqual(["design:ada"]);
  });
});
