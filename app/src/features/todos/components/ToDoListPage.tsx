import { useParams } from "react-router";
import {
  getCategoryLabel,
  isCategoryId,
  type CategoryId,
} from "../domain/categories";
import TodoHead from "./TodoHead";
import { useToDosByCategory } from "../hooks/useToDos";
import ToDoItem from "./ToDoItem";

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
      <TodoHead subHeadlineText={getCategoryLabel(category)} />
      {todos === undefined ? (
        <p>Lädt …</p>
      ) : todos.length === 0 ? (
        <p>Keine To-Do's in dieser Kategorie</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <ToDoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </>
  );
  // todos === undefined → "Lädt …", leer → Hinweis, sonst Titel als einfache Liste
}
