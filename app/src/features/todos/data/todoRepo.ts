import { db } from "@/shared/db/db";
import { createToDo, getNextPosition } from "../domain/logic";
import type { ToDo, TodoInput } from "../domain/todo";

export async function addToDo(input: TodoInput): Promise<ToDo> {
  return db.transaction("rw", db.todos, async () => {
    const todoArray = await db.todos.toArray();
    const todo = createToDo(
      input.title,
      input.description,
      input.category,
      getNextPosition(todoArray, input.category),
    );
    await db.todos.add(todo);
    return todo;
  });
}
