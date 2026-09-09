import { BarChart3, Layers3, MousePointer2, Workflow } from "lucide-react";
import ArrowLink from "../../common/ArrowLink";
import { StatInfoCard } from "./StatInfo";

export default function Stats() {
  return (
    <section className="py-10">
      <div className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 md:text-4xl">
            Built around your trading journey.
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-500 dark:text-gray-400">
            TradeX brings the tools you need to explore markets, place trades,
            and keep track of your portfolio in one focused workspace.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <StatInfoCard
            icon={<Layers3 className="h-6 w-6" />}
            title="One workspace"
            description="Keep your watchlist, orders, holdings, positions, and funds connected in one place."
            iconClass="group-hover:bg-blue-500 group-hover:text-white"
          />

          <StatInfoCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Trade with clarity"
            description="Understand your portfolio through clean numbers, P&L insights, and focused trading views."
            iconClass="group-hover:bg-violet-500 group-hover:text-white"
          />

          <StatInfoCard
            icon={<MousePointer2 className="h-6 w-6" />}
            title="Simple by design"
            description="A focused interface that keeps the important actions visible without unnecessary distractions."
            iconClass="group-hover:bg-emerald-500 group-hover:text-white"
          />

          <StatInfoCard
            icon={<Workflow className="h-6 w-6" />}
            title="Built for real workflows"
            description="From CNC and MIS orders to portfolio tracking, TradeX is designed around practical trading workflows."
            iconClass="group-hover:bg-orange-500 group-hover:text-white"
          />
        </div>

        
        <div className="flex flex-wrap gap-8 pt-2">
          <ArrowLink tag="Explore TradeX" link="/products" />
          <ArrowLink tag="See how it works" link="/about" />
        </div>
      </div>
    </section>
  );
}
