import type { FeatureDefinition } from "@/shared/types/feature";

export const shoppingFeature: FeatureDefinition = {
  id: "shopping",
  title: "Einkaufsliste",
  path: "/shopping",
  loadPage: () => import("./components/ShoppingPage"),
};
