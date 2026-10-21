import * as repo from "../data/todoRepo";
import type { ToDoInput } from "../domain/todo";
import { validateTodoTitle } from "../domain/validation";

export async function addToDo(input: ToDoInput): Promise<string | void> {
  const titleValid = validateTodoTitle(input.title);
  return titleValid === null ? repo.addToDo(input) : titleValid;
}
export const actions = {
  addToDo,
  updateToDo: repo.updateToDo,
  deleteToDo: repo.deleteToDo,
  moveToDo: repo.moveToDo,
};
