import { Link } from "react-router";

export default function LoginBtn() {
  return (
    <Link
      to={"/login"}
      className="bg-white text-black outline-blue-500 outline-3 text-xl py-3 w-40 text-center md:px-14 cursor-pointer rounded-xl hover:text-white hover:bg-blue-500 transition"
    >
      Login
    </Link>
  );
}
