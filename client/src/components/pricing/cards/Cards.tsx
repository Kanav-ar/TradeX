import PricingCard from "./PricingCard";

export default function Cards() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <PricingCard
        category="Equity"
        price="0"
        label="Brokerage"
        features={["Delivery trades", "NSE & BSE", "No brokerage"]}
      />

      <PricingCard
        category="Active Trading"
        price="20"
        label="Brokerage"
        features={["Intraday trading", "F&O trading", "Per executed order"]}
      />

      <PricingCard
        category="Mutual Funds"
        price="0"
        label="Platform commission"
        features={["Direct mutual funds", "Online investing", "No commission"]}
      />
    </div>
  );
}
