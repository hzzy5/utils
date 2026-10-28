import { CATEGORIES, type CategoryId } from "./categories";
import type { Item } from "./item";

export function createItem(
  title: string,
  description: string,
  category: CategoryId,
  position: number,
): Item {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    category,
    position,
    selected: false,
  };
}
export function updateItem(
  item: Item,
  updates: Partial<Omit<Item, "id" | "position" | "category">>,
): Item {
  return {
    ...item,
    ...updates,
  };
}

export function moveItem(
  item: Item,
  newCategory: CategoryId,
  newPosition: number,
): Item {
  return {
    ...item,
    category: newCategory,
    position: newPosition,
    selected: false,
  };
}

export function filterItemCategory(
  items: Item[],
  category: CategoryId,
): Item[] {
  return items.filter((item) => item.category === category);
}

export function getNextPosition(items: Item[], category: CategoryId): number {
  const categoryTodos = filterItemCategory(items, category);
  return categoryTodos.length > 0
    ? Math.max(...categoryTodos.map((todo) => todo.position)) + 1
    : 0;
}

export function sortItemsByPosition(items: Item[]): Item[] {
  return [...items].sort((a, b) => a.position - b.position);
}

export function toggleSelected(item: Item): Item {
  return {
    ...item,
    selected: !item.selected,
  };
}
