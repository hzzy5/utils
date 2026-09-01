import FeatureItem from "../../components/featureItem";

export default function MainScreen() {
  return (
    <>
      <header className="text-left px-4 text-blue-600">
        <h1>utils</h1>
      </header>
      <main>
        <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-4">
          <FeatureItem title="trains" />
          <FeatureItem title="to-do's" />
          <FeatureItem title="streaks" />
          <FeatureItem title="calender" />
          <FeatureItem title="shopping-cart" />
          <FeatureItem title="weather" />
          <FeatureItem title="flash-cards" />
          <FeatureItem title="leaderboards" />
        </nav>
      </main>
    </>
  );
}
