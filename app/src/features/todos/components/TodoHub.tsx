import TodoHead from "./TodoHead";
import ToDoListTile from "./TodoListTile";
import { todoPaths } from "../routes";
import { CATEGORIES } from "../domain/categories";

export function TodoHub() {
  return (
    <>
      <TodoHead />
      <div className=" mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-5">
        {CATEGORIES.map((category) => (
          <ToDoListTile
            key={category.id}
            to={todoPaths.list(category.id)}
            label={category.label}
          />
        ))}
      </div>
    </>
  );
}
