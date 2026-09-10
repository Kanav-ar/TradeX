import { Link } from "react-router";

export default function SignUpBtn() {
  return (
    <Link
      to="/signup"
      className=" inline-flex h-12 w-40 items-center justify-center rounded-xl bg-blue-600 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
    >
      Signup
    </Link>
  );
}
