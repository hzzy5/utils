import type { FeatureDefinition } from "@/shared/types/feature";

export const trainsFeature: FeatureDefinition = {
  id: "trains",
  title: "Züge",
  path: "/trains",
  loadPage: () => import("./components/TrainsPage"),
};
