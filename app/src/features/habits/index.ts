import type { FeatureDefinition } from "@/shared/types/feature";
import { HABIT_BASE } from "./routes";

export const habitsFeature: FeatureDefinition = {
  id: "habits",
  title: "Habitbuilder",
  path: HABIT_BASE,
  loadPage: () => import("./components/HabitPage"),
};
