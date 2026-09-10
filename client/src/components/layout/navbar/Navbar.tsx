import { Link, NavLink } from "react-router";
import ThemeBtn from "../../common/ThemeBtn";
import Dropdown from "./Dropdown";
import { useAuth } from "../../../context/Auth/AuthContext";
import TradeXLogo from "../../common/Logo";

export default function Navbar() {
  const { currentUser } = useAuth();
  return (
    <nav className="w-full z-50 sticky top-0 bg-white flex items-center lg:px-12 md:px-10 min-h-20 shadow-md  dark:shadow-[0_1px_2px_rgba(255,255,255,0.2)] dark:bg-gray-950 transition-all duration-1000">
      <div className="flex-2 px-4 md:px-8 lg:px-16 xl:px-32">
        <Link to={"/"}>
          {" "}
          <TradeXLogo/>
        </Link>
      </div>
      <div
        id="nav-tags"
        className="flex flex-1 justify-center space-x-10 dark:text-white text-gray-800 lg:flex hidden "
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `cursor-pointer hover:text-[#387ed1] ${
              isActive ? "text-[#387ed1] font-semibold" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `cursor-pointer hover:text-[#387ed1] ${
              isActive ? "text-[#387ed1] font-semibold" : ""
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `cursor-pointer hover:text-[#387ed1] ${
              isActive ? "text-[#387ed1] font-semibold" : ""
            }`
          }
        >
          Pricing
        </NavLink>

        <NavLink
          to="/support"
          className={({ isActive }) =>
            `cursor-pointer hover:text-[#387ed1] ${
              isActive ? "text-[#387ed1] font-semibold" : ""
            }`
          }
        >
          Support
        </NavLink>

        {currentUser && (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `cursor-pointer hover:text-[#387ed1] ${
                isActive ? "text-[#387ed1] font-semibold" : ""
              }`
            }
          >
            Profile
          </NavLink>
        )}

        {currentUser ? (
          <a
            href="http://localhost:5174"
            className={`cursor-pointer  hover:text-[#387ed1]`}
          >
            Dashboard
          </a>
        ) : (
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `cursor-pointer hover:text-[#387ed1] ${
                isActive ? "text-[#387ed1] font-semibold" : ""
              }`
            }
          >
            Signup
          </NavLink>
        )}

        {!currentUser && (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `cursor-pointer hover:text-[#387ed1] ${
                isActive ? "text-[#387ed1] font-semibold" : ""
              }`
            }
          >
            Login
          </NavLink>
        )}
      </div>

      <div className="flex items-center md:space-x-8 lg:space-x-10 space-x-4 lg:px-12 px-4">
        <Dropdown />

        <ThemeBtn />
      </div>
    </nav>
  );
}
