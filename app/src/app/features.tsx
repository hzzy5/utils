import type { FeatureDefinition } from "@/shared/types/feature";
import { todoFeature } from "@/features/todos";
import { trainsFeature } from "@/features/trains";

export const features: FeatureDefinition[] = [todoFeature, trainsFeature];
