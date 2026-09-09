import Heading from "./Heading";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 py-10 text-center">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-500">
          TradeX Support
        </p>

        <Heading>How can we help?</Heading>

        <p className="text-gray-500 dark:text-gray-400">
          Find answers about your account, trading, portfolio, funds, and
          everything else inside TradeX.
        </p>
      </div>

      <SearchBar
        placeholder="Search for help with orders, funds, login..."
      />
    </div>
  );
}