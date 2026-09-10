import { NavLink } from "react-router";
import { LogOut, MenuIcon, Moon, Sun, X } from "lucide-react";
import useTheme from "../context/Theme/themeContext";
import { useAuth } from "../context/Auth/AuthContext";
import TradeXLogo from "./Logo";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Orders", path: "/orders" },
  { name: "Holdings", path: "/holdings" },
  { name: "Positions", path: "/positions" },
  { name: "Funds", path: "/funds" },
];
export default function Menu() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="flex h-full w-full justify-between items-center justify-between px-6 py-[10px]">
      <TradeXLogo />

      <div className="flex items-center ">
        <ul className="list-none hidden xl:block">
          {menuItems.map((item) => (
            <li key={item.name} className="mr-[30px] inline-block">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-[0.8rem] font-normal transition-colors duration-150 ${
                    isActive
                      ? "text-[#f56834]"
                      : "text-[#464646] dark:text-white hover:text-[#f56834]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="xl:hidden rounded-lg mx-2 cursor-pointer p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>

        {isOpen && (
          <div className="absolute top-13 rounded-lg  right-40 z-50 border-b border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-[#0d1421] xl:hidden">
            <div className="flex flex-col p-4">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-blue-50 font-medium text-[#387ed1] dark:bg-blue-950/40 dark:text-blue-400"
                        : "text-gray-600 hover:bg-[#387ed1]/30 dark:text-gray-300 dark:hover:bg-[#387ed1]/30"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="my-2 h-px bg-gray-200 dark:bg-gray-700" />

              <button
                type="button"
                onClick={toggleTheme}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}

                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        )}

        <hr className="h-[30px] border-l border-[#f3f2f2]" />

        <div className="flex gap-1 lg:gap-4">
          <div className="ml-5 flex items-center gap-3">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-blue-200 font-semibold text-[rgb(0, 6, 42)]">
              {currentUser?.username?.[0]?.toUpperCase()}
            </div>

            <p className="font-semibold text-[#464646] dark:text-gray-200">
              {currentUser?.username}
            </p>
          </div>

          <div className="hidden xl:block">
            <button
              type="button"
              onClick={logout}
              className="flex gap-2 items-center rounded-lg px-3 py-1.5 text-sm text-red-500 cursor-pointer transition hover:bg-red-500/10"
            >
              <LogOut />
            </button>
          </div>

          <div className="hidden xl:block flex items-center md:space-x-8 lg:space-x-8 space-x-4 px-4">
            <button
              className="p-2 rounded-full cursor-pointer hover:bg-gray-950/20 dark:text-white dark:hover:bg-white/20"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun strokeWidth={2.5} />
              ) : (
                <Moon strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
