import { Outlet } from "react-router";
import TopBar from "./topbar/TopBar";
import BotBar from "./botbar/BotBar";

function AppLayout() {
  return (
    <>
      <header>
        <TopBar></TopBar>
      </header>
      <body>
        <Outlet></Outlet>
      </body>
      <footer>
        <BotBar></BotBar>
      </footer>
    </>
  );
}

export default AppLayout;
