import { NavLink } from "react-router";
import { ArrowRightIcon, Moon, Sun } from "lucide-react";
import kiteLogoImg from "../assets/kitelogo.png";
import useTheme from "../context/Theme/themeContext";
import { useAuth } from "../context/Auth/AuthContext";

const menuItems = ["Dashboard", "Orders", "Holdings", "Positions", "Funds"];

export default function Menu() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  return (
    <div className="flex h-full basis-[68%] items-center justify-between px-5 py-[10px]">
      <img src={kiteLogoImg} alt="logo" className="w-[50px]" />

      <div className="px-4">
        <div className="flex flex-1 items-center ">
          <ul className="list-none">
            {menuItems.map((item) => (
              <li key={item} className="mr-[30px] inline-block">
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `text-[0.8rem] font-normal transition-colors duration-150 ${
                      isActive
                        ? "text-[#f56834]"
                        : "text-[#464646] dark:text-white hover:text-[#f56834]"
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          <hr className="h-[30px] border-l border-[#f3f2f2]" />

          <div className="ml-5 flex items-center gap-3">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-blue-200 font-semibold text-[rgb(0, 6, 42)]">
              {currentUser?.username?.[0]?.toUpperCase()}
            </div>

            <p className="font-semibold text-[#464646] dark:text-gray-200">
              {currentUser?.username}
            </p>

            <button
              type="button"
              onClick={logout}
              className="flex gap-2 items-center rounded-lg px-3 py-1.5 text-sm text-red-500 cursor-pointer transition hover:bg-red-500/10"
            >
              Logout <ArrowRightIcon />
            </button>
          </div>

          <div className="flex items-center md:space-x-8 lg:space-x-8 space-x-4 lg:px- px-4">
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
