import { ToDoForm } from "./ToDoForm";
import TodoHead from "./TodoHead";

export function ToDoCreate() {
  return (
    <>
      <TodoHead subHeadlineText="Neues erstellen" />
      <ToDoForm type="create" />
    </>
  );
}
