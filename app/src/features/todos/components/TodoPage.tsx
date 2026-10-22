import { Route, Routes } from "react-router/internal/react-server-client";
import { TodoHub } from "./TodoHub";
import TodoListPage from "./ToDoListPage";
import { ToDoCreate } from "./ToDoCreate";
import { ToDoDetail } from "./ToDoDetail";

function TodoPage() {
  return (
    <Routes>
      <Route index element={<TodoHub />} />
      <Route path="list/:category" element={<TodoListPage />} />
      <Route path="new" element={<ToDoCreate />} />
      <Route path=":id" element={<ToDoDetail />} />
      <Route path="*" element={<p>Seite nicht gefunden</p>} />
    </Routes>
  );
}

export default TodoPage;
