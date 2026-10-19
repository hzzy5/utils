import type { FeatureDefinition } from "@/shared/types/feature";

export const todoFeature: FeatureDefinition = {
  id: "todo",
  title: "To-Do's",
  path: "/todos",
  loadPage: () => import("./components/TodoPage"),
};
