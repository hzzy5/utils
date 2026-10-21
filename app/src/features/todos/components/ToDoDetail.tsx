import { ToDoForm } from "./ToDoForm";
import TodoHead from "./TodoHead";

export function ToDoDetail({ id }: { id: string }) {
  return (
    <>
      <TodoHead subHeadlineText="Detail" />
      <p>{id}</p>
      <ToDoForm type="detail" />
    </>
  );
}
