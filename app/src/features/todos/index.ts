import type { FeatureDefinition } from "@/shared/types/feature";

export const todoFeature: FeatureDefinition = {
  id: "todo",
  title: "To-Do Liste",
  path: "/todo",
  loadPage: () => import("./components/TodoPage"),
};
