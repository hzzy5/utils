import Dexie, { type EntityTable } from "dexie";
import type { ToDo } from "@/features/todos/domain/todo";

export const db = new Dexie("utils") as Dexie & {
  todos: EntityTable<ToDo, "id">;
};

db.version(1).stores({
  todos: "id, category",
});
