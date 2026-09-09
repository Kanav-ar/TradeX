import BlueBtn from "./BlueBtn";

export default function OpenAccount() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <span className="mb-4 text-sm font-medium tracking-[0.2em] text-blue-500">
        Get started with TradeX
      </span>

      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        Your market. Your moves.
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
        Create your TradeX account and get a focused workspace for exploring
        markets, placing trades, and tracking your portfolio.
      </p>

      <div className="mt-8">
        <BlueBtn tag="Get started for free" />
      </div>

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
        Start exploring TradeX today.
      </p>
    </div>
  );
}
