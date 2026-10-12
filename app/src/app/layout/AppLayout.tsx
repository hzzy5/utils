import { Outlet } from "react-router";
import TopBar from "./topbar/TopBar";
import BotBar from "./botbar/BotBar";

function AppLayout() {
  return (
    <>
      <TopBar></TopBar>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default AppLayout;
