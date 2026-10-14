import { Outlet, useNavigation } from "react-router";
import TopBar from "./topbar/TopBar";
import Loading from "@/shared/ui/Loading";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <TopBar></TopBar>
      <main>{isLoading ? <Loading /> : <Outlet />}</main>
    </>
  );
}

export default AppLayout;
