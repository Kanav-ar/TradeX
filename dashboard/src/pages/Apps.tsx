
const apps = [
  {
    name: "Zenora",
    description:
      "An Airbnb-inspired property hosting platform where users can discover and host properties.",
    status: "LIVE",
    url: "https://zenora-ofl8.onrender.com/",
  },
];
const Apps = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-800 dark:text-gray-100">
          Apps
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
         My work
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <div
            key={app.name}
            className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-[#111827]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-lg font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              {app.name[0]}
            </div>

            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {app.name}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {app.description}
            </p>

            <button
              type="button"
              className="mt-6 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;