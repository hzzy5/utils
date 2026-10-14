import { features } from "../features";
import FeatureTile from "../components/FeatureTile";

function HomePage() {
  return (
    <>
      <div className="feature-list">
        {features.map((feature) => (
          <FeatureTile key={feature.id} feature={feature} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
