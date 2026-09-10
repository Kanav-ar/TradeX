import { Link } from "react-router";

export default function LoginBtn() {
  return (
    <Link
      to="/login"
      className=" inline-flex h-12 w-40 items-center justify-center rounded-xl border border-gray-300 bg-white font-semibold text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 dark:focus:ring-offset-gray-950"
    >
      Log in
    </Link>
  );
}
