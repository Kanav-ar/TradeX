
interface StatInfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconClass: string;
}

export function StatInfoCard({
  icon,
  title,
  description,
  iconClass,
}: StatInfoCardProps) {
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
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        dark:border-gray-700
        dark:bg-[#0d1421]
      "
    >
      <div
        className={`
          mb-5
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-gray-100
          text-gray-700
          transition-all
          duration-300
          dark:bg-gray-800
          dark:text-gray-300
          ${iconClass}
        `}
      >
        {icon}
      </div>

      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {title}
      </h2>

      <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500 dark:text-gray-400">
        {description}
      </p>

      <div
        className="
          pointer-events-none
          absolute
          -right-12
          -top-12
          h-32
          w-32
          rounded-full
          bg-blue-500/5
          blur-2xl
          transition-all
          duration-500
          group-hover:scale-150
        "
      />
    </div>
  );
}
