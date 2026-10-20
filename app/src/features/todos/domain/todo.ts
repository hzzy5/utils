import type { CategoryId } from "./categories";

export interface ToDo {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  position: number;
}

export type ToDoInput = Pick<ToDo, "title" | "description" | "category">;
