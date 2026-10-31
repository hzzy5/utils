import type { CategoryId } from "./categories";

export interface Item {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  position: number;
  selected: boolean;
}

export type ItemInput = Pick<Item, "title" | "description" | "category">;
