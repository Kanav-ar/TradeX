interface PricingCardProps {
  category: string;
  price: string;
  label: string;
  features: string[];
}

export default function PricingCard({
  category,
  price,
  label,
  features,
}: PricingCardProps) {
  return (
    <>
      <div className="w-full max-w-5xl mx-auto z-20 max-md:px-4">
        <div className="px-4">
            <div className="p-6 bg-white ring ring-blue-950 mx-auto w-full max-w-sm rounded-lg shadow-lg hover:ring-blue-500 dark:bg-black/20 transition-all duration-400">
              <h3 className="text-xl font-bold">{category}</h3>
              <div className="my-4">
                <span className="text-5xl text-[#387ed1] font-bold">₹{price}</span>
              </div>

              <p className="text-gray-400 mb-6">{label}</p>

              <ul className="space-y-1.5 mb-6 text-sm">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-500 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      </div>
    </>
  );
}
