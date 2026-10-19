import { features } from "../../features";
import FeatureTile from "./FeatureTile";

function HomePage() {
  return (
    <>
      <div className="feature-list mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-5">
        {features.map((feature) => (
          <FeatureTile key={feature.id} feature={feature} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
