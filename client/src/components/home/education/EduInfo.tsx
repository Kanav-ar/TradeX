import { ArrowUpRight } from "lucide-react";

interface EducationCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  level: string;
  link: string;
}

export default function EduInfoCard({
  number,
  icon,
  title,
  description,
  level,
  link,
}: EducationCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-7
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-300
        hover:shadow-xl
        dark:border-gray-700
        dark:bg-[#0d1421]
        dark:hover:border-blue-500
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-600">
          {number}
        </span>

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-gray-100
            text-gray-700
            transition-all
            duration-300
            group-hover:bg-blue-500
            group-hover:text-white
            dark:bg-gray-800
            dark:text-gray-300
            dark:group-hover:bg-blue-500
          "
        >
          {icon}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-4 min-h-[96px] text-sm leading-6 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-5 dark:border-gray-800">
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
          {level}
        </span>

        <a
          href={link}
          target="_blank"
          className="flex items-center cursor-pointer gap-1 text-xs font-medium text-blue-500 opacity-70 transition-all duration-300 group-hover:gap-2 group-hover:opacity-100"
        >
          Explore
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div
        className="
          pointer-events-none
          absolute
          -bottom-16
          -right-16
          h-32
          w-32
          rounded-full
          bg-blue-500/5
          blur-3xl
          transition-transform
          duration-500
          group-hover:scale-150
        "
      />
    </div>
  );
}
