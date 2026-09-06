import logo from "../../../assets/logo.svg";
import { Link, NavLink } from "react-router";
import ThemeBtn from "../../common/ThemeBtn";
import Dropdown from "./Dropdown";

export default function Navbar() {
  return (
    <nav className="w-full z-50 sticky top-0 bg-white flex items-center lg:px-12 md:px-10 min-h-20 shadow-md dark:shadow-white dark:shadow-2xs dark:bg-gray-950 transition-all duration-1000">
      <div className="flex-2 px-4 md:px-8 lg:px-16 xl:px-32">
        <Link to={"/"}>
          {" "}
          {/* <img src={logo} alt="logo" className="w-32.25" /> */}
          <h1 className="text-4xl font-bold text-[#387ed1]">
        TradeX
      </h1>
        </Link>
      </div>
      <div
        id="nav-tags"
        className="flex flex-1 justify-center space-x-10 dark:text-white text-gray-800 lg:flex hidden "
      >
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `cursor-pointer hover:text-blue-500 ${
              isActive ? "text-[#387ed1] font-semibold" : ""
            }`
          }
        >
          Signup
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
          to="/products"
          className={({ isActive }) =>
            `cursor-pointer hover:text-[#387ed1] ${
              isActive ? "text-[#387ed1] font-semibold" : ""
            }`
          }
        >
          Products
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
      </div>

      <div className="flex items-center md:space-x-8 lg:space-x-10 space-x-4 lg:px-12 px-4">
       <Dropdown/>

        <ThemeBtn />
      </div>
    </nav>
  );
}
