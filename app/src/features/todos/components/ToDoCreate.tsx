import { ToDoForm } from "./ToDoForm";
import TodoHead from "./TodoHead";
import { actions } from "../hooks/useToDosActions";
import { isCategoryId, type CategoryId } from "../domain/categories";
import { useNavigate, useSearchParams } from "react-router";
import type { ToDoInput } from "../domain/todo";

export function ToDoCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get("category");
  const initialCategory: CategoryId =
    categoryParam !== null && isCategoryId(categoryParam)
      ? categoryParam
      : "tagesplan";

  async function handleSubmit(values: ToDoInput) {
    const result = await actions.addToDo(values);
    if (result.ok) {
      navigate(-1);
    }
    return result;
  }

  return (
    <>
      <TodoHead subHeadlineText="Neues erstellen" />
      <ToDoForm
        initialValues={{
          title: "",
          description: "",
          category: initialCategory,
        }}
        submitLabel="Erstellen"
        onSubmit={handleSubmit}
        onDelete={undefined}
      />
    </>
  );
}
