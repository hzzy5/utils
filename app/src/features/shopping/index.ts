import type { FeatureDefinition } from "@/shared/types/feature";
import { SHOPPING_BASE } from "./routes";

export const shoppingFeature: FeatureDefinition = {
  id: "shopping",
  title: "Einkaufsliste",
  path: SHOPPING_BASE,
  loadPage: () => import("./components/ShoppingPage"),
};
