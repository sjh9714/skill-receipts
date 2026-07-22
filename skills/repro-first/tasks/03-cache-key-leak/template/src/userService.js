import { createCache } from "./cache.js";

// makeUserService(loadUsers): loadUsers(opts) queries the directory backend.
// getUsers(opts) caches results for 60s to keep the people picker fast.
// opts: { team, includeArchived }.
export function makeUserService(loadUsers) {
  const cache = createCache(60_000);
  return {
    async getUsers(opts) {
      const key = `users:${opts.team}`;
      const hit = cache.get(key);
      if (hit !== undefined) return hit;
      const users = await loadUsers(opts);
      cache.set(key, users);
      return users;
    },
  };
}
