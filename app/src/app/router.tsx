import { createBrowserRouter } from "react-router";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import TodoPage from "@/features/todos/components/TodoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "todos", element: <TodoPage /> },
    ],
  },
]);
