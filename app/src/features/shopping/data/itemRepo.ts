import { db } from "@/shared/db/db";
import type { Item, ItemInput } from "../domain/item";
import {
  createItem,
  getNextPosition,
  sortItemsByPosition,
  updateItem as applyUpdate,
  moveItem as applyMove,
  toggleSelected as applyToggle,
} from "../domain/logic";
import type { CategoryId } from "../domain/categories";

export async function addItem(input: ItemInput): Promise<void> {
  await db.transaction("rw", db.items, async () => {
    const itemArray = await db.items.toArray();
    const item = createItem(
      input.title,
      input.description,
      input.category,
      getNextPosition(itemArray, input.category),
    );
    await db.items.add(item);
  });
}

export async function getItemsByCategory(
  category: CategoryId,
): Promise<Item[]> {
  const items = await db.items.where("category").equals(category).toArray();
  return sortItemsByPosition(items);
}

export async function getItems(id: string): Promise<Item | null> {
  return (await db.items.get(id)) ?? null;
}

export async function getItem(id: string): Promise<Item | null> {
  return (await db.items.get(id)) ?? null;
}

export async function updateItem(
  id: string,
  updates: Pick<Item, "title" | "description">,
): Promise<void> {
  await db.transaction("rw", db.items, async () => {
    const oldItem = await db.items.get(id);
    if (!oldItem) return;
    const item = applyUpdate(oldItem, updates);
    await db.items.put(item);
  });
}

export async function deleteItem(id: string): Promise<void> {
  await db.items.delete(id);
}

export async function moveItem(
  id: string,
  newCategory: CategoryId,
): Promise<void> {
  await db.transaction("rw", db.items, async () => {
    const items = await db.items.toArray();
    const oldItem = await db.items.get(id);
    if (!oldItem) return;
    const item = applyMove(
      oldItem,
      newCategory,
      getNextPosition(items, newCategory),
    );
    await db.items.put(item);
  });
}

export async function toggleSelected(id: string): Promise<void> {
  await db.transaction("rw", db.items, async () => {
    const oldItem = await db.items.get(id);
    if (!oldItem) return;
    const item = applyToggle(oldItem);
    await db.items.put(item);
  });
}

export async function reorderItems(
  category: CategoryId,
  orderedIds: string[],
): Promise<void> {
  await db.transaction("rw", db.items, async () => {
    const categoryItems = await db.items
      .where("category")
      .equals(category)
      .toArray();

    const itemsMap = new Map(categoryItems.map((item) => [item.id, item]));
    const requestedOrder = orderedIds.flatMap((id) => {
      const item = itemsMap.get(id);
      if (!item) return [];

      itemsMap.delete(id);
      return [item];
    });
    const remainingItems = [...itemsMap.values()].sort(
      (a, b) => a.position - b.position,
    );
    const reorderedItems = [...requestedOrder, ...remainingItems].map(
      (item, position) => ({ ...item, position }),
    );

    await db.items.bulkPut(reorderedItems);
  });
}
