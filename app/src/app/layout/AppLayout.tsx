import { Outlet } from "react-router";

function AppLayout() {
  return (
    <>
      <header></header>
      <body>
        <Outlet></Outlet>
      </body>
      <footer></footer>
    </>
  );
}

export default AppLayout;
