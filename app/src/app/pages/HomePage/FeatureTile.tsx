import type { FeatureDefinition } from "@/shared/types/feature";
import Tile from "@/app/components/Tile";

export default function FeatureTile({
  feature,
}: {
  feature: FeatureDefinition;
}) {
  return <Tile title={feature.title} path={feature.path} />;
}
