import type { CategoryId } from "./domain/categories";

export const TODO_BASE = "/todos";

export const todoPaths = {
  hub: TODO_BASE,
  list: (category: CategoryId) => `${TODO_BASE}/list/${category}`,
  create: `${TODO_BASE}/new`,
  detail: (id: string) => `${TODO_BASE}/${id}`,
};
