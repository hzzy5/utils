import type { FeatureDefinition } from "@/shared/types/feature";
import { Link } from "react-router";

export default function FeatureTile({
  feature,
}: {
  feature: FeatureDefinition;
}) {
  return <Link to={feature.path}>{feature.title}</Link>;
}
