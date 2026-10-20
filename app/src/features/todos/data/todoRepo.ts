import { db } from "@/shared/db/db";
import {
  createToDo,
  getNextPosition,
  sortToDosByPosition,
  updateToDo as applyUpdate,
  moveToDo as applyMove,
} from "../domain/logic";
import type { ToDo, TodoInput } from "../domain/todo";
import type { CategoryId } from "../domain/categories";

export async function addToDo(input: TodoInput): Promise<void> {
  await db.transaction("rw", db.todos, async () => {
    const todoArray = await db.todos.toArray();
    const todo = createToDo(
      input.title,
      input.description,
      input.category,
      getNextPosition(todoArray, input.category),
    );
    await db.todos.add(todo);
  });
}

export async function getToDosByCategory(
  category: CategoryId,
): Promise<ToDo[]> {
  const todos = await db.todos.where("category").equals(category).toArray();
  return sortToDosByPosition(todos);
}

export async function getToDo(id: string): Promise<ToDo | undefined> {
  return db.todos.get(id);
}

export async function updateToDo(
  id: string,
  updates: Pick<ToDo, "title" | "description">,
): Promise<void> {
  await db.transaction("rw", db.todos, async () => {
    const todo = await db.todos.get(id);
    if (!todo) return;
    await db.todos.put(applyUpdate(todo, updates));
  });
}

export async function deleteToDo(id: string): Promise<void> {
  await db.todos.delete(id);
}

export async function moveToDo(
  id: string,
  newCategory: CategoryId,
): Promise<void> {
  await db.transaction("rw", db.todos, async () => {
    const todoArray = await db.todos.toArray();
    const todo = await db.todos.get(id);
    if (!todo) return;
    await db.todos.put(
      applyMove(todo, newCategory, getNextPosition(todoArray, newCategory)),
    );
  });
}
