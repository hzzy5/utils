import { useNavigate, useParams } from "react-router";
import { ToDoForm } from "./ToDoForm";
import TodoHead from "./TodoHead";
import { useToDo } from "../hooks/useToDos";
import { actions } from "../hooks/useToDosActions";
import type { ToDoInput } from "../domain/todo";

export function ToDoDetail() {
  const { id } = useParams();
  const todo = useToDo(id ?? "");
  const navigate = useNavigate();

  async function handleSubmit(values: ToDoInput) {
    const result = await actions.updateToDo(todo!, values);
    if (result.ok) {
      navigate(-1);
    }
    return result;
  }

  if (!id || todo === null) {
    return <p>To-Do nicht gefunden</p>;
  }
  if (todo === undefined) {
    return <p>Lädt …</p>;
  }

  return (
    <>
      <TodoHead subHeadlineText="Detail" />
      <ToDoForm
        initialValues={{
          title: todo.title,
          description: todo.description,
          category: todo.category,
        }}
        submitLabel="Speichern"
        onSubmit={handleSubmit}
      />
      <button
        onClick={() => {
          actions.deleteToDo(todo!.id);
          navigate(-1);
        }}
      >
        Löschen
      </button>
    </>
  );
}
