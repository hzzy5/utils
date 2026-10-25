import type { CategoryId } from "./categories";

export interface ToDo {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  position: number;
  selected: boolean;
}

export type ToDoInput = Pick<ToDo, "title" | "description" | "category">;
