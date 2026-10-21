import * as repo from "../data/todoRepo";
import type { ToDoInput } from "../domain/todo";
import { validateTodoTitle } from "../domain/validation";

async function addToDo(input: ToDoInput): Promise<string | void> {
  const titleValid = validateTodoTitle(input.title);
  return titleValid === null ? repo.addToDo(input) : titleValid;
}
