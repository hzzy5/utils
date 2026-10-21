import Tile from "@/shared/ui/Tile";
import { todoPaths } from "../routes";
import type { ToDo } from "../domain/todo";

export default function ToDoItem({ todo }: { todo: ToDo }) {
  return (
    <div className="">
      <Tile title={todo.title} path={todoPaths.detail(todo.id)} />
    </div>
  );
}
