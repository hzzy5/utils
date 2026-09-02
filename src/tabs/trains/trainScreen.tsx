import { Link } from "react-router-dom";
import FeatureItem from "../../components/featureItem";

export default function TrainScreen() {
  return (
    <>
      <header className="text-left px-4 text-blue-600">
        <h1>utils</h1>
        <h2>trains</h2>
      </header>
      <main>
        <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-4">
          <Link to="/trains/hsd">
            <FeatureItem title="HB5 <-> HSD" />
          </Link>
          <FeatureItem title="HB5 <-> Hbf" />
          <FeatureItem title="HB5 <-> Queen" />
          <FeatureItem title="HB5 <-> Greven" />
          <FeatureItem title="HB5 <-> Altstadt" />
        </nav>
      </main>
    </>
  );
}
