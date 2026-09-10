import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router";
import { useAuth } from "../../../context/Auth/AuthContext";
import { BiRightArrowAlt } from "react-icons/bi";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const links = currentUser
    ? [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Pricing", path: "/pricing" },
        { name: "Support", path: "/support" },
        { name: "Profile", path: "/profile" },
      ]
    : [
        { name: "Signup", path: "/signup" },
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Pricing", path: "/pricing" },
        { name: "Support", path: "/support" },
      ];

  return (
    <div className="relative lg:hidden block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-gray-800 dark:text-white flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-950/20 dark:hover:bg-white/20"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-13 w-52 rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <div className="flex flex-col">
            {currentUser && (
              <div className="pt-2 px-1 cursor-pointer">
                <span className=" dark:text-white">
                  {currentUser?.fullname}
                </span>
                <hr className="my-3 text-gray-400/60" />
              </div>
            )}
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-50 font-semibold text-[#387ed1] dark:bg-gray-800"
                      : "text-gray-800 hover:bg-[#387ed1]/25 dark:text-gray-200 dark:hover:bg-[#387ed1]/25"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {
              currentUser && (<a className="rounded-lg px-4 py-3 transition text-gray-700 hover:bg-blue-100 font-semibold dark:text-white hover:dark:bg-blue-500/30" href={`${import.meta.env.VITE_DASHBOARD_URL}`}>
                Dashboard
              </a>)
            }
            {currentUser && (
              <button
                className="text-red-500 dark:text-red-400 cursor-pointer flex px-4 py-4 hover:bg-red-400/20 rounded-lg transition"
                onClick={logout}
              >
                <span>Logout</span>
                <BiRightArrowAlt className="text-xl" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
