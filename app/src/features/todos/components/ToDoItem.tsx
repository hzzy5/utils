import { todoPaths } from "../routes";
import type { ToDo } from "../domain/todo";
import { toggleSelected } from "../data/todoRepo";
import { Link } from "react-router";
import { GripVerticalIcon } from "lucide-react";
import Tile from "@/shared/ui/Tile";

export default function ToDoItem({ todo }: { todo: ToDo }) {
  return (
    <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center border-4 border-black bg-[#d9d9d9] py-1 text-center text-xl font-light text-black font-[Abel]">
      <label className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={todo.selected}
          onChange={() => toggleSelected(todo.id)}
          className="h-5 w-5 accent-neutral-800"
        />
      </label>
      <Link
        to={todoPaths.detail(todo.id)}
        className="break-words px-2 text-black"
      >
        {todo.title}
      </Link>
      <span className="flex items-center justify-center">
        <GripVerticalIcon className="h-5 w-5 text-black" />
      </span>
    </div>
  );
}
// export default function ToDoItem({ todo }: { todo: ToDo }) {
//   return (
//     <Tile
//       title={todo.title}
//       path={todoPaths.detail(todo.id)}
//       textSize="text-xl"
//       className=" font-[Abel]"
//       paddingY="py-1"
//     />
//   );
// }
