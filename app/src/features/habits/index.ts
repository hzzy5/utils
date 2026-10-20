import type { FeatureDefinition } from "@/shared/types/feature";

export const habitsFeature: FeatureDefinition = {
  id: "habits",
  title: "Habitbuilder",
  path: "/habits",
  loadPage: () => import("./components/HabitPage"),
};
