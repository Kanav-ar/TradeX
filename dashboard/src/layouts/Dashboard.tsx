import { Outlet } from "react-router";
import WatchList from "../components/WatchList";
import TopBar from "../components/TopBar";
import OrderWindowContextProvider from "../context/Order/OrderWindowContextProvider";

export default function DashboardLayout() {
  return (
    <>
      <TopBar />

        <div className="flex h-[calc(100vh-10vh)] overflow-y-auto">
          <OrderWindowContextProvider>
            <WatchList />
          </OrderWindowContextProvider>

          <main className="flex-1 px-8 py-6 transition-colors duration-100 dark:bg-[#070d17]  flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
    </>
  );
}
