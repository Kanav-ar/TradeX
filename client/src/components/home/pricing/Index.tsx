import ArrowLink from "../../common/ArrowLink";
import PricingCard from "./PricingCard";

export default function Pricing() {
  return (
    <>
      <div className="flex lg:flex-row flex-col gap-12 dark:text-white">
        <div className="flex flex-col gap-8 lg:gap-10 lg:w-2/5">
          <h1 className="text-3xl font-semibold">
            Simple pricing. No surprises.
          </h1>{" "}
          <div className="flex flex-col gap-8">
            <p>
              {" "}
              TradeX keeps pricing straightforward so you can focus on the
              markets instead of complicated fee structures.
            </p>
            <ArrowLink tag="View full pricing" link="/pricing" />{" "}
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-4 md:gap-8 justify-between lg:w-3/5">
          <PricingCard
            price="0"
            tag="Free account opening"
            description="Get started with TradeX without an account opening fee."
          />
          <PricingCard
            price="0"
            tag="Equity investing"
            description="Keep long term investing simple with transparent pricing."
          />
          <PricingCard
            price="20"
            tag="Intraday & F&O"
            description="Trade short term opportunities with clear order level pricing."
          />
        </div>
      </div>
    </>
  );
}
