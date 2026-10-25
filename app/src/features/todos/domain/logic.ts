import { type CategoryId } from "./categories";
import type { ToDo } from "./todo";

const CATEGORY_FLOW = [
  "backlog",
  "offen",
  "tagesplan",
  "done",
] satisfies readonly CategoryId[];

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
    selected: false,
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
    selected: false,
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
  const index = CATEGORY_FLOW.indexOf(id);
  return CATEGORY_FLOW[index + 1] ?? null;
}

export function getPreviousCategory(id: CategoryId): CategoryId | null {
  const index = CATEGORY_FLOW.indexOf(id);
  return CATEGORY_FLOW[index - 1] ?? null;
}

export function toggleSelected(todo: ToDo): ToDo {
  return {
    ...todo,
    selected: !todo.selected,
  };
}
