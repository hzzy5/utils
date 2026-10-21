import { useLiveQuery } from "dexie-react-hooks";
import { getToDo, getToDosByCategory } from "../data/todoRepo";
import type { CategoryId } from "../domain/categories";

export function useToDosByCategory(category: CategoryId) {
  return useLiveQuery(() => getToDosByCategory(category), [category]);
}

export function useToDo(id: string) {
  return useLiveQuery(() => getToDo(id), [id]);
}
