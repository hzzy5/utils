import type { FeatureDefinition } from "@/shared/types/feature";
import { todoFeature } from "@/features/todos";
import { trainsFeature } from "@/features/trains";
import { shoppingFeature } from "@/features/shopping";
import { rankingFeature } from "@/features/ranking";
import { quizFeature } from "@/features/quiz";
import { habitsFeature } from "@/features/habits";
import { weatherFeature } from "@/features/weather";

export const features: FeatureDefinition[] = [
  todoFeature,
  trainsFeature,
  shoppingFeature,
  habitsFeature,
  quizFeature,
  rankingFeature,
  weatherFeature,
];
