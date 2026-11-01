import { useLiveQuery } from "dexie-react-hooks";
import { getItem, getItemsByCategory } from "../data/itemRepo";
import type { CategoryId } from "../domain/categories";

export function useItemsByCategory(category: CategoryId) {
  return useLiveQuery(() => getItemsByCategory(category), [category]);
}

export function useItem(id: string) {
  return useLiveQuery(() => getItem(id), [id]);
}
//undefined = lädt, null = gibts nicht
