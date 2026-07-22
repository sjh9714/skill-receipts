import { paginate } from "./paginate.js";

// The search endpoint's list handler.
export function listPage(rows, page, size) {
  const { items, total } = paginate(rows, page, size);
  return { rows: items, total, page };
}
