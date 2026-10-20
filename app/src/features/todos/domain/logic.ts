import { CATEGORIES, type CategoryId } from "./categories";
import type { ToDo } from "./todo";

export function createToDo(
  title: string,
  description: string,
  category: CategoryId,
  position: number,
): ToDo {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    category,
    position,
  };
}
export function updateToDo(
  todo: ToDo,
  updates: Partial<Omit<ToDo, "id" | "position" | "category">>,
): ToDo {
  return {
    ...todo,
    ...updates,
  };
}

export function moveToDo(
  todo: ToDo,
  newCategory: CategoryId,
  newPosition: number,
): ToDo {
  return {
    ...todo,
    category: newCategory,
    position: newPosition,
  };
}

export function filterToDoCategory(
  todos: ToDo[],
  category: CategoryId,
): ToDo[] {
  return todos.filter((todo) => todo.category === category);
}

export function getNextPosition(todos: ToDo[], category: CategoryId): number {
  const categoryTodos = filterToDoCategory(todos, category);
  return categoryTodos.length > 0
    ? Math.max(...categoryTodos.map((todo) => todo.position)) + 1
    : 0;
}

export function sortToDosByPosition(todos: ToDo[]): ToDo[] {
  return [...todos].sort((a, b) => a.position - b.position);
}

export function getNextCategory(id: CategoryId): CategoryId | null {
  const index = CATEGORIES.findIndex((category) => category.id === id);
  return CATEGORIES[index + 1]?.id ?? null;
}

export function getPreviousCategory(id: CategoryId): CategoryId | null {
  const index = CATEGORIES.findIndex((category) => category.id === id);
  return CATEGORIES[index - 1]?.id ?? null;
}
