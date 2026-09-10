import {
  ArrowUpRight,
  BookOpen,
  ChartNoAxesCombined,
  ShieldCheck,
} from "lucide-react";
import EduInfoCard from "./EduInfo";

export default function Education() {
  return (
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-blue-500">
            Learn with TradeX
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Learn the market.
            <br />
            Trade with confidence.
          </h1>

          <p className="mt-5 text-base leading-7 text-gray-500 dark:text-gray-400">
            Practical market knowledge to help you understand what you're
            trading and make more informed decisions.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <EduInfoCard
            number="01"
            icon={<BookOpen className="h-5 w-5" />}
            title="Market Basics"
            description="Understand stocks, exchanges, prices, orders, and the building blocks of the market."
            level="Beginner"
            link="https://investor.sebi.gov.in/securities-howtoinvest.html"
          />

          <EduInfoCard
            number="02"
            icon={<ChartNoAxesCombined className="h-5 w-5" />}
            title="Trading Fundamentals"
            description="Learn how CNC and MIS work, how positions are built, and how trades affect your portfolio."
            level="Beginner → Intermediate"
            link="https://investor.sebi.gov.in/investment-thingsbeforeinv.html"
          />

          <EduInfoCard
            number="03"
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Risk & Strategy"
            description="Build better trading habits by understanding risk, position sizing, P&L, and trade discipline."
            level="Intermediate"
            link="https://investor.sebi.gov.in/securities-risks_trade_derivatives.html"
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Learn at your own pace.
          </p>

          <a
            type="button"
            href="https://investor.sebi.gov.in/inv_aware_edu_videos.html"
            className="
              group
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-blue-600
              transition-colors
              hover:text-blue-700
              dark:text-blue-400
              dark:hover:text-blue-300
            "
          >
            Explore learning resources
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
  );
}
