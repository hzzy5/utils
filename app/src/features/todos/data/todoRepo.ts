import { db } from "@/shared/db/db";
import {
  createToDo,
  getNextPosition,
  sortToDosByPosition,
  updateToDo as applyUpdate,
  moveToDo as applyMove,
  toggleSelected as applyToggleSelected,
} from "../domain/logic";
import type { ToDo, ToDoInput } from "../domain/todo";
import type { CategoryId } from "../domain/categories";

export async function addToDo(input: ToDoInput): Promise<void> {
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

export async function getToDo(id: string): Promise<ToDo | null> {
  return (await db.todos.get(id)) ?? null;
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

export async function toggleSelected(id: string): Promise<void> {
  await db.transaction("rw", db.todos, async () => {
    const todo = await db.todos.get(id);
    if (!todo) return;
    await db.todos.put(applyToggleSelected(todo));
  });
}

export async function moveSelectedToCategory(
  from: CategoryId,
  to: CategoryId,
): Promise<number> {
  return db.transaction("rw", db.todos, async () => {
    const selected = await db.todos
      .where("category")
      .equals(from)
      .and((todo) => todo.selected)
      .sortBy("position");
    if (selected.length === 0) return 0;
    const targets = await db.todos.where("category").equals(to).toArray();
    const start = getNextPosition(targets, to);

    const moved = selected.map((todo, index) =>
      applyMove(todo, to, start + index),
    );
    await db.todos.bulkPut(moved);
    return moved.length;
  });
}

export async function reorderToDos(
  category: CategoryId,
  orderedIds: string[],
): Promise<void> {
  await db.transaction("rw", db.todos, async () => {
    const categoryTodos = await db.todos
      .where("category")
      .equals(category)
      .toArray();

    const todosById = new Map(categoryTodos.map((todo) => [todo.id, todo]));

    const requestedOrder = orderedIds.flatMap((id) => {
      const todo = todosById.get(id);
      if (!todo) return [];

      todosById.delete(id);
      return [todo];
    });

    const remainingTodos = [...todosById.values()].sort(
      (a, b) => a.position - b.position,
    );

    const reorderedTodos = [...requestedOrder, ...remainingTodos].map(
      (todo, position) => ({ ...todo, position }),
    );

    await db.todos.bulkPut(reorderedTodos);
  });
}
