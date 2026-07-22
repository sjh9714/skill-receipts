export interface Product {
  name: string;
  price: number;
}

// Returns products whose name starts with the query, case-insensitively.
export function searchByPrefix(products: Product[], query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter((product) => product.name.toLowerCase().startsWith(q));
}

export function sortByPrice(products: Product[]): Product[] {
  return [...products].sort((a, b) => a.price - b.price);
}
