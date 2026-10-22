import * as repo from "../data/todoRepo";
import type { ToDo, ToDoInput } from "../domain/todo";
import { validateTodoTitle, type SubmitResult } from "../domain/validation";

export async function addToDo(input: ToDoInput): Promise<SubmitResult> {
  const titleValid = validateTodoTitle(input.title);
  if (!titleValid.ok) {
    return { ok: false, error: titleValid.error };
  }

  await repo.addToDo({
    ...input,
    title: titleValid.value,
    description: input.description.trim(),
  });
  return { ok: true };
}

export async function updateToDo(
  todo: ToDo,
  updates: ToDoInput,
): Promise<SubmitResult> {
  const titleValid = validateTodoTitle(updates.title);
  if (!titleValid.ok) {
    return { ok: false, error: titleValid.error };
  }

  await repo.updateToDo(todo.id, {
    ...updates,
    title: titleValid.value,
    description: updates.description.trim(),
  });

  if (todo.category !== updates.category) {
    await repo.moveToDo(todo.id, updates.category);
  }
  return { ok: true };
}

export const actions = {
  addToDo,
  updateToDo,
  deleteToDo: repo.deleteToDo,
  moveToDo: repo.moveToDo,
};
