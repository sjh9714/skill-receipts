import { describe, expect, it } from "vitest";
import { makeUserService } from "../src/userService.js";

// Repro: an includeArchived:true result must not be served from cache to an
// includeArchived:false request.
describe("archived-user leak", () => {
  it("does not serve archived users to a request that excluded them", async () => {
    const loadUsers = async ({ includeArchived }) =>
      includeArchived ? ["ada", "grace(archived)"] : ["ada"];
    const service = makeUserService(loadUsers);
    await service.getUsers({ team: "eng", includeArchived: true });
    const visible = await service.getUsers({ team: "eng", includeArchived: false });
    expect(visible).toEqual(["ada"]);
  });
});
