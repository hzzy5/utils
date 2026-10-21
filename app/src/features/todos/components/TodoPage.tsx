import { Route, Routes } from "react-router/internal/react-server-client";
import { TodoHub } from "./TodoHub";
import TodoListPage from "./ToDoListPage";

function TodoPage() {
  return (
    <Routes>
      <Route index element={<TodoHub />} />
      <Route path="list/:category" element={<TodoListPage />} />
      <Route path="new" element={<p>Neues To-Do</p>} />
      <Route path=":id" element={<p>Detail</p>} />
      <Route path="*" element={<p>Seite nicht gefunden</p>} />
    </Routes>
  );
}

export default TodoPage;
