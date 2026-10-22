import { ToDoForm } from "./ToDoForm";
import TodoHead from "./TodoHead";
import { actions } from "../hooks/useToDosActions";
import { CATEGORIES } from "../domain/categories";
import { useLocation, useNavigate } from "react-router";
import type { ToDoInput } from "../domain/todo";

export function ToDoCreate() {
  const navigate = useNavigate();

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
          category: CATEGORIES[0].id,
        }}
        submitLabel="Erstellen"
        onSubmit={handleSubmit}
      />
    </>
  );
}
