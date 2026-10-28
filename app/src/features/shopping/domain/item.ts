export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  position: number;
  selected: boolean;
}

export type ToDoInput = Pick<Item, "title" | "description" | "category">;
