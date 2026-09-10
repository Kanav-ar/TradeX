import type { MouseEventHandler } from "react";

export default function BlueBtn({
  tag,
  disabled,
  onClick,
}: {
  tag: string;
  disabled:boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className=" inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-7 cursor-pointer font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 active:translate-y-0 active:scale-[0.98]"
    >
      {tag}
    </button>
  );
}
