import type { ComponentType } from "react";

export interface FeatureDefinition {
  id: string;
  title: string;
  path: string;
  loadPage: () => Promise<{ default: ComponentType }>;
}
