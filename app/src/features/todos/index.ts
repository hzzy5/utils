import type { FeatureDefinition } from "@/shared/types/feature";
import { TODO_BASE } from "./routes";

export const todoFeature: FeatureDefinition = {
  id: "todo",
  title: "To-Do's",
  path: TODO_BASE,
  loadPage: () => import("./components/TodoPage"),
};
