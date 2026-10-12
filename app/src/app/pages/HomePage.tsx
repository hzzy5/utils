import { Link } from "react-router";

function HomePage() {
  return (
    <>
      <h1>HomePage</h1>
      <Link to={"/todos"}>todos</Link>
    </>
  );
}

export default HomePage;
