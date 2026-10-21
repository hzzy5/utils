import { useParams } from "react-router";
import {
  getCategoryLabel,
  isCategoryId,
  type CategoryId,
} from "../domain/categories";
import TodoHead from "./TodoHead";
//import { useToDosByCategory } from "../hooks/useToDos";

export default function TodoListPage() {
  const { category } = useParams();

  if (!category || !isCategoryId(category)) {
    return <p>Kategorie nicht gefunden</p>;
  }
  return <CategoryList category={category} />;
}

function CategoryList({ category }: { category: CategoryId }) {
  //const todos = useToDosByCategory(category);
  return <TodoHead subHeadlineText={getCategoryLabel(category)} />;
  // todos === undefined → "Lädt …", leer → Hinweis, sonst Titel als einfache Liste
}
