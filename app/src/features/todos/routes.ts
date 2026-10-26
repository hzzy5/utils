import type { CategoryId } from "./domain/categories";

export const TODO_BASE = "/todos";

export const todoPaths = {
  hub: TODO_BASE,
  list: (category: CategoryId) => `${TODO_BASE}/list/${category}`,
  create: (category?: CategoryId) =>
    category ? `${TODO_BASE}/new?category=${category}` : `${TODO_BASE}/new`,
  detail: (id: string) => `${TODO_BASE}/${id}`,
};
