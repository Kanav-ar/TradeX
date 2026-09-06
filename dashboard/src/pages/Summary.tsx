import { useAuth } from "../context/Auth/AuthContext";
import { useFundsStore } from "../store/funds.store";
import { useHoldingStore } from "../store/holdings.store";
import { useEffect } from "react";

const Summary = () => {
  const { currentUser } = useAuth();

  const funds = useFundsStore((state) => state.funds);
  const allHoldings = useHoldingStore((state) => state.allHoldings);
  const refreshHoldings = useHoldingStore((state) => state.refreshHoldings);
  const refreshFunds = useFundsStore((state) => state.refreshFunds);

  useEffect(() => {
    const loadSummaryData = async () => {
      try {
        await Promise.all([refreshFunds(), refreshHoldings()]);
      } catch (error) {
        console.error("Failed to load summary data:", error);
      }
    };

    loadSummaryData();
  }, [refreshFunds, refreshHoldings]);

  // all calculations
  const totalInvestment = allHoldings.reduce(
    (total, holding) => total + holding.avg * holding.qty,
    0,
  );

  const currentValue = allHoldings.reduce(
    (total, holding) => total + holding.price * holding.qty,
    0,
  );

  const totalPnL = currentValue - totalInvestment;

  const pnlPercentage =
    totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const marginAvailable = funds ? funds.availableCash - funds.usedMargin : 0;

  const isProfit = totalPnL >= 0;
  const pnlSign = isProfit ? "+" : "";

  const pnlClass = isProfit
    ? "text-green-500 dark:text-green-400"
    : "text-red-500 dark:text-red-400";

  return (
    <>
      <div>
        <h6 className="mb-[20px] text-[1.5rem] font-normal text-[rgb(83,83,83)] dark:text-gray-100">
          Hi, {currentUser?.fullname}!
        </h6>

        <SectionLine />
      </div>

      <div className="pb-[2%]">
        <SectionHeading heading="Equity" />

        <div className="flex w-full flex-col gap-8 md:w-1/2 md:flex-row md:items-center md:justify-evenly">
          <div>
            <h3 className="text-[2.5rem] font-light text-[rgb(71,71,71)] dark:text-gray-100">
              ₹{marginAvailable.toFixed(2)}
            </h3>

            <p className="text-[0.8rem] text-[rgb(136,136,136)] dark:text-gray-400">
              Margin available
            </p>
          </div>

          <hr className="hidden h-[70px] border-l border-[#f3f2f2] md:block dark:border-gray-700" />

          <div>
            <p className="mb-[10px] whitespace-nowrap text-[0.8rem] text-[rgb(136,136,136)] dark:text-gray-400">
              Margins used
              <span className="ml-[5%] inline text-[0.9rem] text-[rgb(100,100,100)] dark:text-gray-200">
                ₹{funds?.usedMargin.toFixed(2) ?? "0.00"}
              </span>
            </p>

            <p className="whitespace-nowrap text-[0.8rem] text-[rgb(136,136,136)] dark:text-gray-400">
              Opening balance
              <span className="ml-[5%] inline text-[0.9rem] text-[rgb(100,100,100)] dark:text-gray-200">
                ₹{funds?.openingBalance.toFixed(2) ?? "0.00"}
              </span>
            </p>
          </div>
        </div>

        <SectionLine />
      </div>

      <div className="pb-[2%]">
        <SectionHeading heading={`Holdings (${allHoldings.length})`} />

        <div className="flex w-full flex-col gap-8 md:w-1/2 md:flex-row md:items-center md:justify-evenly">
          <div>
            <h3 className="text-[2.5rem] font-light text-[rgb(72,194,55)]">
              ₹{totalPnL.toFixed(2)}{" "}
              <small className={`text-[0.8rem] ${pnlClass}`}>
                ({pnlSign}
                {pnlPercentage.toFixed(2)}%)
              </small>
            </h3>

            <p className="text-[0.8rem] text-[rgb(136,136,136)] dark:text-gray-400">
              P&amp;L
            </p>
          </div>

          <hr className="hidden h-[70px] border-l border-[#f3f2f2] md:block dark:border-gray-700" />

          <div>
            <p className="mb-[10px] whitespace-nowrap text-[0.8rem] text-[rgb(136,136,136)] dark:text-gray-400">
              Current Value
              <span className="ml-[5%] inline text-[0.9rem] text-[rgb(100,100,100)] dark:text-gray-200">
                ₹{currentValue.toFixed(2)}
              </span>
            </p>

            <p className="whitespace-nowrap text-[0.8rem] text-[rgb(136,136,136)] dark:text-gray-400">
              Investment
              <span className="ml-[5%] inline text-[0.9rem] text-[rgb(100,100,100)] dark:text-gray-200">
                ₹{totalInvestment.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <SectionLine />
      </div>
    </>
  );
};

export default Summary;

function SectionLine() {
  return (
    <hr className="mt-[20px] mb-[5%] h-[1px] border-none bg-gray-300 dark:bg-gray-700" />
  );
}

function SectionHeading({ heading }: { heading: string }) {
  return (
    <span className="mb-[2%] flex items-center">
      <p className="inline-block text-[1.2rem] font-light text-[rgb(71,71,71)] dark:text-gray-200">
        {heading}
      </p>
    </span>
  );
}
