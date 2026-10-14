import type { FeatureDefinition } from "@/shared/types/feature";

export const todoFeature: FeatureDefinition = {
  id: "todo",
  title: "To-Do Liste",
  path: "/todos",
  loadPage: () => import("./components/TodoPage"),
};
