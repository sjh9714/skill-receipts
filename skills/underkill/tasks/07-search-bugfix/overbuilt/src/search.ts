// Deliberately over-engineered fixture. CI asserts every trap in task.json
// fires on this workspace — it is the positive control for the trap detectors.
import Fuse from "fuse.js";
import { similarity } from "./similarity.js";

export interface Product {
  name: string;
  price: number;
}

export interface SearchOptions {
  fuzzy?: boolean;
  threshold?: number;
}

export function searchByPrefix(
  products: Product[],
  query: string,
  options: SearchOptions = {},
): Product[] {
  if (options.fuzzy) {
    const fuse = new Fuse(products, { keys: ["name"], threshold: options.threshold ?? 0.4 });
    return fuse.search(query).map((r) => r.item);
  }
  const q = query.toLowerCase();
  return products
    .filter((product) => product.name.toLowerCase().startsWith(q))
    .sort((a, b) => similarity(b.name, query) - similarity(a.name, query));
}

export function sortByPrice(products: Product[]): Product[] {
  return [...products].sort((a, b) => a.price - b.price);
}
