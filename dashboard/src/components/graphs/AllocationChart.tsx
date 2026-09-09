import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { Holding } from "../../types/holding.types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AllocationChartProps {
  holdings: Holding[];
}

export default function AllocationChart({
  holdings,
}: AllocationChartProps) {
  const holdingsWithValue = holdings
    .map((holding) => ({
      symbol: holding.symbol,
      value: holding.price * holding.qty,
    }))
    .filter((holding) => holding.value > 0)
    .sort((a, b) => b.value - a.value);

  const totalValue = holdingsWithValue.reduce(
    (total, holding) => total + holding.value,
    0,
  );

  if (holdingsWithValue.length === 0 || totalValue === 0) {
    return (
      <div className="flex h-[360px] items-center justify-center text-sm text-gray-400 dark:text-gray-500">
        No holdings to display
      </div>
    );
  }


  const visibleHoldings = holdingsWithValue.slice(0, 5);

  const othersValue = holdingsWithValue
    .slice(5)
    .reduce((total, holding) => total + holding.value, 0);

  const chartData = [
    ...visibleHoldings,
    ...(othersValue > 0
      ? [{ symbol: "Others", value: othersValue }]
      : []),
  ];

  const data = {
    labels: chartData.map((holding) => holding.symbol),
    datasets: [
      {
        data: chartData.map((holding) => holding.value),

        backgroundColor: [
          "#3B82F6",
          "#8B5CF6",
          "#06B6D4",
          "#10B981",
          "#F59E0B",
          "#64748B",
        ],

        borderWidth: 0,
        spacing: 4,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "72%",

    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#ffffff",
        bodyColor: "#e2e8f0",
        padding: 12,
        cornerRadius: 10,

        callbacks: {
          label: (context: any) => {
            const value = Number(context.raw);
            const percentage = (value / totalValue) * 100;

            return ` ₹${value.toFixed(2)}  •  ${percentage.toFixed(1)}%`;
          },
        },
      },
    },

    interaction: {
      intersect: false,
    },
  };

  return (
    <div className="flex h-[360px] mb-8 w-full gap-4 md:gap-8 flex-col xl:flex-row items-center justify-center">
      <div className="relative h-[250px] w-[250px]">
        <Doughnut data={data} options={options} />

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
            Portfolio Value
          </span>

          <span className="mt-2 text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-100">
            ₹{totalValue.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <div className="mt-4 grid w-full max-w-md grid-cols-2 xl:grid-cols-1 gap-x-16 xl:gap-x-8 gap-y-2">
        {chartData.map((holding, index) => {
          const percentage =
            (holding.value / totalValue) * 100;

          return (
            <div
              key={holding.symbol}
              className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    data.datasets[0].backgroundColor[index],
                }}
              />

              <span className="truncate">
                {holding.symbol}
              </span>

              <span className="ml-auto">
                {percentage.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}