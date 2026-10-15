import { Outlet, useNavigation } from "react-router";
import TopBar from "./topbar/TopBar";
import Loading from "@/shared/ui/Loading";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="min-h-dvh bg-[#303030]">
      <TopBar></TopBar>
      <main>{isLoading ? <Loading /> : <Outlet />}</main>
    </div>
  );
}

export default AppLayout;
