import { useParams } from "react-router";
import { ToDoForm } from "./ToDoForm";
import TodoHead from "./TodoHead";
import { useToDo } from "../hooks/useToDos";
import { actions } from "../hooks/useToDosActions";

export function ToDoDetail() {
  const { id } = useParams();
  const todo = useToDo(id ?? "");

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
        onSubmit={(updates) => actions.updateToDo(todo, updates)}
      />
    </>
  );
}
