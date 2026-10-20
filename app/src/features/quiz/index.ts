import type { FeatureDefinition } from "@/shared/types/feature";

export const quizFeature: FeatureDefinition = {
  id: "quiz",
  title: "Flashcards",
  path: "/quiz",
  loadPage: () => import("./components/QuizPage"),
};
