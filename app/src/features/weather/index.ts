import type { FeatureDefinition } from "@/shared/types/feature";

export const weatherFeature: FeatureDefinition = {
  id: "weather",
  title: "Wetter",
  path: "/weather",
  loadPage: () => import("./components/WeatherPage"),
};
