import { useState } from "react";
import { X } from "lucide-react";
import { Outlet } from "react-router";
import WatchList from "../components/WatchList";
import TopBar from "../components/TopBar";
import OrderWindowContextProvider from "../context/Order/OrderWindowContextProvider";

export default function DashboardLayout() {
  const [watchlistOpen, setWatchlistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#070d17]">
      <TopBar />

      <div className="relative flex h-[calc(100vh-10vh)] min-h-0">
        <OrderWindowContextProvider>
         
          <div className="hidden lg:block lg:w-[32%] ">
            <WatchList />
          </div>

         
          {watchlistOpen && (
            <>
              <button
                type="button"
                aria-label="Close watchlist"
                onClick={() => setWatchlistOpen(false)}
                className=" fixed inset-0 z-40 bg-black/40 lg:hidden"
              />

              <aside
                className=" fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl dark:bg-[#070d17] lg:hidden
                "
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Watchlist
                    </p>

                    <button
                      type="button"
                      onClick={() => setWatchlistOpen(false)}
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="min-h-0 flex-1">
                    <WatchList />
                  </div>
                </div>
              </aside>
            </>
          )}

          <main className="min-w-0 flex-1 overflow-y-auto p-4 transition-colors duration-200 sm:p-6 lg:p-8">
          
            <button
              type="button"
              onClick={() => setWatchlistOpen(true)}
              className="
                mb-4
                inline-flex
                items-center
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-gray-700
                shadow-sm
                transition-all
                hover:border-blue-400
                hover:text-blue-500
                dark:border-gray-700
                dark:bg-[#0d1421]
                dark:text-gray-300
                dark:hover:border-blue-500
                lg:hidden
              "
            >
              Open Watchlist
            </button>

            <Outlet />
          </main>
        </OrderWindowContextProvider>
      </div>
    </div>
  );
}