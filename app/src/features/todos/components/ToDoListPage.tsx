import { useParams } from "react-router";
import {
  getCategoryLabel,
  isCategoryId,
  type CategoryId,
} from "../domain/categories";
import TodoHead from "./TodoHead";
import { useToDosByCategory } from "../hooks/useToDos";

export default function TodoListPage() {
  const { kategorie } = useParams();

  if (!kategorie || !isCategoryId(kategorie)) {
    return <p>Kategorie nicht gefunden</p>;
  }
  return <CategoryList category={kategorie} />;
}

function CategoryList({ category }: { category: CategoryId }) {
  const todos = useToDosByCategory(category);
  return <TodoHead subHeadlineText={getCategoryLabel(category)} />;
  // todos === undefined → "Lädt …", leer → Hinweis, sonst Titel als einfache Liste
}
