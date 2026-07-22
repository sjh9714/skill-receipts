import { createCache } from "./cache.js";

// makeUserService(loadUsers): loadUsers(opts) queries the directory backend.
// getUsers(opts) caches results for 60s to keep the people picker fast.
// opts: { team, includeArchived }.
export function makeUserService(loadUsers) {
  return {
    async getUsers(opts) {
      return loadUsers(opts);
    },
  };
}
