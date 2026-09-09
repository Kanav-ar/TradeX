import ArrowLink from "../../common/ArrowLink";

export default function HeroProducts() {
  return (
    <div className="space-y-7 text-center">
      <div className="space-y-4">
        <p className="text-sm font-medium tracking-[0.2em] text-blue-500">
          The TradeX platform
        </p>

        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Everything you need to trade smarter.
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-500 dark:text-gray-400">
          Explore the tools that help you discover markets, place trades,
          manage your portfolio, and stay on top of your money.
        </p>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Explore the{" "}
        <ArrowLink tag="TradeX experience" link="" />
      </p>
    </div>
  );
}