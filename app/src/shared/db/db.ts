import Dexie, { type EntityTable } from "dexie";
import type { ToDo } from "@/features/todos/domain/todo";
import type { Item } from "@/features/shopping/domain/item";

export const db = new Dexie("utils") as Dexie & {
  todos: EntityTable<ToDo, "id">;
  items: EntityTable<Item, "id">;
};

db.version(1).stores({
  todos: "id, category",
});

db.version(2).stores({
  todos: "id, category",
  items: "id, category",
});
