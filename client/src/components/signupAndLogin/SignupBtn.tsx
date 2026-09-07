import { Link } from "react-router";

export default function SignUpBtn() {
  return (
    <Link
      to={"/signup"}
      className="bg-blue-500 text-white text-xl text-center outline-3 outline-blue-500 w-40 py-3 cursor-pointer rounded-xl dark:bg-blue-500 hover:outline-blue-600 hover:bg-blue-600 transition"
    >
      Signup
    </Link>
  );
}
