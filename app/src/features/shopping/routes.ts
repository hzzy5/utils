import type { CategoryId } from "./domain/categories";

export const SHOPPING_BASE = "/shopping";

export const shoppingPaths = {
  hub: SHOPPING_BASE,
  list: (category: CategoryId) => `${SHOPPING_BASE}/list/${category}`,
  create: (category?: CategoryId) =>
    category
      ? `${SHOPPING_BASE}/new?category=${category}`
      : `${SHOPPING_BASE}/new`,
  detail: (id: string) => `${SHOPPING_BASE}/${id}`,
};
