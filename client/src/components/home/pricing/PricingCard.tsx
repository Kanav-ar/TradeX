export default function PricingCard({
  price,
  tag,
  description,
}: {
  price: string;
  tag: string;
  description: string;
}) {
  return (
    <div
      className="
        group
        flex
        min-h-[190px]
        flex-1
        flex-col
        items-center
        justify-between
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        text-center
        transition-all
        duration-300
        hover:border-blue-400
        hover:shadow-lg
        dark:border-gray-700
        dark:bg-[#0d1421]
        dark:hover:border-blue-500
      "
    >

      <div className="flex items-baseline gap-1">
        <span className="text-sm text-gray-500 dark:text-gray-400">₹</span>
        <span className="text-5xl mb-4 font-bold text-yellow-500 dark:text-yellow-500">
          {price}
        </span>
        {price !== "0" && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            / order
          </span>
        )}
      </div>
      <p className="mb-3 text-lg font-semibold leading-6 text-gray-800 dark:text-gray-200">
        {tag}
      </p>
      <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
