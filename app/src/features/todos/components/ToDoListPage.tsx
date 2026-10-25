import { useParams } from "react-router";
import {
  getCategoryLabel,
  isCategoryId,
  type CategoryId,
} from "../domain/categories";
import TodoHead from "./TodoHead";
import { useToDosByCategory } from "../hooks/useToDos";
import ToDoItem from "./ToDoItem";
import FloatingActionButton from "@/shared/ui/FloatingActionButton";
import { todoPaths } from "../routes";
import {
  moveCheckedToNext,
  moveCheckedToPrevious,
} from "../hooks/useToDosActions";

export default function TodoListPage() {
  const { category } = useParams();

  if (!category || !isCategoryId(category)) {
    return <p>Kategorie nicht gefunden</p>;
  }
  return <CategoryList category={category} />;
}

function CategoryList({ category }: { category: CategoryId }) {
  const todos = useToDosByCategory(category);
  return (
    <>
      <TodoHead
        subHeadlineText={getCategoryLabel(category)}
        buttonMode={true}
        category={category}
        onPressLeft={() => moveCheckedToNext(category)}
        onPressRight={() => moveCheckedToPrevious(category)}
      />
      <FloatingActionButton to={todoPaths.create} />
      {todos === undefined ? (
        <p>Lädt …</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-500">
          Keine To-Do's in dieser Kategorie
        </p>
      ) : (
        <ul className="mx-auto flex w-full max-w-[25rem] flex-col gap-4 px-4 py-5">
          {todos.map((todo) => (
            <ToDoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </>
  );
  // todos === undefined → "Lädt …", leer → Hinweis, sonst Titel als einfache Liste
}
