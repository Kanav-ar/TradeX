import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { Order } from "../../types/order.types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface TradingActivityChartProps {
  orders: Order[];
}

export default function TradingActivityChart({
  orders,
}: TradingActivityChartProps) {
  const buyOrders = orders.filter((order) => order.side === "BUY");

  const sellOrders = orders.filter((order) => order.side === "SELL");

  const cncOrders = orders.filter((order) => order.product === "CNC");

  const misOrders = orders.filter((order) => order.product === "MIS");

  const totalOrders = orders.length;

  const buyPercentage =
    totalOrders > 0 ? (buyOrders.length / totalOrders) * 100 : 0;

  const sellPercentage =
    totalOrders > 0 ? (sellOrders.length / totalOrders) * 100 : 0;

  if (totalOrders === 0) {
    return (
      <div className="flex h-[360px] flex-col items-center justify-center text-center">
        <p className="text-base font-medium text-gray-700 dark:text-gray-200">
          No trading activity yet
        </p>

        <p className="mt-2 max-w-xs text-sm text-gray-400 dark:text-gray-500">
          Your BUY and SELL activity will appear here after you place your first
          order.
        </p>
      </div>
    );
  }

  const data = {
    labels: ["BUY", "SELL"],
    datasets: [
      {
        data: [buyOrders.length, sellOrders.length],

        backgroundColor: [
          "rgba(59, 130, 246, 0.88)",
          "rgba(249, 115, 22, 0.88)",
        ],

        borderColor: ["rgba(59, 130, 246, 1)", "rgba(249, 115, 22, 1)"],

        borderWidth: 1,
        borderRadius: 12,
        borderSkipped: false,
        barThickness: 28,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,

    animation: {
      duration: 1000,
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.96)",
        titleColor: "#ffffff",
        bodyColor: "#e2e8f0",
        padding: 12,
        cornerRadius: 10,

        callbacks: {
          label: (context: any) => {
            const count = Number(context.raw);

            const percentage =
              totalOrders > 0 ? (count / totalOrders) * 100 : 0;

            return ` ${count} orders • ${percentage.toFixed(1)}%`;
          },
        },
      },
    },

    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          color: "#94a3b8",
        },
        grid: {
          color: "rgba(148, 163, 184, 0.12)",
        },
        border: {
          display: false,
        },
      },

      y: {
        ticks: {
          color: "#64748b",
          font: {
            size: 9,
            weight: 600,
          },
        },

        grid: {
          display: false,
        },

        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex h-[330px] flex-col">
      <div className="relative h-[180px] w-full">
        <Bar data={data} options={options} />
      </div>

      <hr className="border-gray-200 dark:border-gray-700 mt-4 mb-1" />
      <div className="flex justify-between">
        <div className="mt-3 flex gap-4 w-full">
          <ActivityStat
            label="BUY"
            value={buyOrders.length}
            percentage={buyPercentage}
            className="text-blue-500 dark:text-blue-400 "
          />

          <ActivityStat
            label="SELL"
            value={sellOrders.length}
            percentage={sellPercentage}
            className="text-orange-500 dark:text-orange-400 "
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 border-gray-200 text-xs dark:border-gray-700">
          <div>
            <span className="text-gray-400 dark:text-gray-500">CNC</span>

            <span className="ml-2 font-medium text-gray-700 dark:text-gray-200">
              {cncOrders.length}
            </span>
          </div>

          <div>
            <span className="text-gray-400 dark:text-gray-500">MIS</span>

            <span className="ml-2 font-medium text-gray-700 dark:text-gray-200">
              {misOrders.length}
            </span>
          </div>

          <div>
            <span className="text-gray-400 dark:text-gray-500">Total</span>

            <span className="ml-2 font-medium text-gray-700 dark:text-gray-200">
              {totalOrders}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ActivityStatProps {
  label: string;
  value: number;
  percentage: number;
  className: string;
}

function ActivityStat({
  label,
  value,
  percentage,
  className,
}: ActivityStatProps) {
  return (
    <div className="rounded-xl bg-gray-50 px-4 py-3 min-w-35 dark:bg-gray-800/60">
      <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>

      <div className="mt-1 flex items-end justify-between gap-2">
        <span className={`text-2xl font-semibold ${className}`}>{value}</span>

        <span className="pb-0.5 text-xs text-gray-400 dark:text-gray-500">
          {percentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
