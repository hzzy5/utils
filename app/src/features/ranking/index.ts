import type { FeatureDefinition } from "@/shared/types/feature";

export const rankingFeature: FeatureDefinition = {
  id: "ranking",
  title: "Rankings",
  path: "/ranking",
  loadPage: () => import("./components/RankingPage"),
};
