import { Outlet, useNavigation } from "react-router";
import TopBar from "./topbar/TopBar";
import Loading from "@/shared/ui/Loading";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="min-h-dvh bg-[#303030]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
      </div>
      <main>{isLoading ? <Loading /> : <Outlet />}</main>
    </div>
  );
}

export default AppLayout;
