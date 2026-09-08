import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Holding } from "../../types/holding.types";

interface PortfolioAllocationChartProps {
  holdings: Holding[];
}

export default function PortfolioAllocationChart({
  holdings,
}: PortfolioAllocationChartProps) {
  const totalValue = holdings.reduce(
    (total, holding) => total + holding.price * holding.qty,
    0,
  );

  const data = holdings
    .map((holding) => ({
      name: holding.symbol,
      value: holding.price * holding.qty,
    }))
    .filter((holding) => holding.value > 0)
    .sort((a, b) => b.value - a.value);

  if (data.length === 0 || totalValue === 0) {
    return (
      <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-gray-400 dark:text-gray-500">
        No holdings to display
      </div>
    );
  }

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="75%"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`${entry.name}-${index}`} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => {
              const numericValue = Number(value);
              const percentage =
                (numericValue / totalValue) * 100;

              return [
                `₹${numericValue.toFixed(2)} (${percentage.toFixed(2)}%)`,
                "Value",
              ];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}