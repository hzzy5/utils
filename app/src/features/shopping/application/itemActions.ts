import * as repo from "../data/itemRepo.ts";
import type { Item, ItemInput } from "../domain/item";
import { validateItemTitle, type SubmitResult } from "../domain/validation";

export const actions = {
  addItem,
  updateItem,
  deleteItem: repo.deleteItem,
  moveItem: repo.moveItem,
  toggleSelected: repo.toggleSelected,
  reorderItems: repo.reorderItems,
};

async function addItem(input: ItemInput): Promise<SubmitResult> {
  const titleValid = validateItemTitle(input.title);
  if (!titleValid.ok) {
    return { ok: false, error: titleValid.error };
  }

  await repo.addItem({
    ...input,
    title: titleValid.value,
    description: input.description.trim(),
  });
  return { ok: true };
}

async function updateItem(
  item: Item,
  updates: ItemInput,
): Promise<SubmitResult> {
  const titleValid = validateItemTitle(updates.title);
  if (!titleValid.ok) {
    return { ok: false, error: titleValid.error };
  }

  await repo.updateItem(item.id, {
    ...updates,
    title: titleValid.value,
    description: updates.description.trim(),
  });
  if (item.category !== updates.category) {
    await repo.moveItem(item.id, updates.category);
  }

  return { ok: true };
}
