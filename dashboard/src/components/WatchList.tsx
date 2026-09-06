import { ArrowDown, ArrowUp, BarChart, MoreHorizontal } from "lucide-react";
import { Tooltip } from "@mui/material";
import useOrderWindow from "../context/Order/OrderWindowContext";
import { useEffect } from "react";
import { getStockQuotes, getWatchlist } from "../api/watchlist.api";
import { useWatchlistStore } from "../store/watchlist.store";

const WatchList = () => {
  const { stocks, quotes, setStocks, setQuotes } = useWatchlistStore();
  const quoteMap = new Map(quotes.map((quote) => [quote.symbol, quote]));
  

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist();

        setStocks(data.stocks);
        const symbols = data.stocks.map((stock) => stock.symbol);

        const quoteData = await getStockQuotes(symbols);

        setQuotes(quoteData);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
      }
    };

    fetchWatchlist();
  }, [setStocks, setQuotes]);

  return (
    <div className=" hidden lg:block lg:basis-[32%] h-viewport overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-[#070d17] dark:shadow-none transition-colors duration-200">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className=" w-full border-b border-gray-200 bg-transparent px-5 py-4 pr-20 text-[0.9rem] font-normal text-gray-700 placeholder:text-gray-400 outline-none dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500
          "
        />

        <span
          className=" absolute right-5 text-[0.9rem] font-normal text-gray-400 dark:text-gray-500
          "
        >
          {stocks.length}/50
        </span>
      </div>

      <ul className="flex-1 overflow-y-auto pb-20">
        {stocks.map((stock) => {
          const quote = quoteMap.get(stock.symbol);

          return (
            <WatchListItem
              key={stock.symbol}
              symbol={stock.symbol}
              name={stock.company_name}
              exchange={stock.exchange}
              isin={stock.isin}
              price={quote?.close ?? null}
              changePercent={quote?.change_pct ?? null}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default WatchList;

interface WatchListItemProps {
  symbol: string;
  name: string;
  exchange: string;
  isin: string;
  price: number | null;
  changePercent: number | null;
}

function WatchListItem({
  symbol,
  name,
  exchange,
  isin,
  price,
  changePercent,
}: WatchListItemProps) {
  const { openOrderWindow } = useOrderWindow();
  const isDown = (changePercent ?? 0) < 0;
  return (
    <li className="relative group border-b border-gray-200 px-4 py-3 hover:cursor-move hover:bg-[#f3f3f3] dark:border-gray-800 dark:hover:bg-[#111827]">
      <div className="relative flex items-center justify-between text-[0.8rem] font-light">
        <div className="flex w-full items-center justify-between gap-6 xl:gap-8">
          <div className="flex-2">
            <span className="text-gray-700 dark:text-gray-300">{name}</span>

            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              {symbol} · {exchange}
            </p>
          </div>

          <div className="flex flex-1 items-center gap-4 justify-between">
            <span
              className={
                changePercent === null
                  ? "text-gray-400 dark:text-gray-500"
                  : isDown
                    ? "text-red-500 dark:text-red-400"
                    : "text-green-500 dark:text-green-400"
              }
            >
              {changePercent === null
                ? "--"
                : `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`}

              {changePercent !== null &&
                (isDown ? (
                  <ArrowDown className="ml-1 inline h-3 w-3" />
                ) : (
                  <ArrowUp className="ml-1 inline h-3 w-3" />
                ))}
            </span>

            <span className="text-gray-700 dark:text-gray-300">
              {price === null ? "--" : price.toFixed(2)}
            </span>
          </div>
        </div>

        <WatchListActions
          BuyFn={() =>
            openOrderWindow({
              symbol,
              exchange,
              isin,
              name,
              price: price ?? 0,
              side: "BUY",
            })
          }
          SellFn={() =>
            openOrderWindow({
              symbol,
              exchange,
              isin,
              name,
              price: price ?? 0,
              side: "SELL",
            })
          }
        />
      </div>
    </li>
  );
}

function WatchListActions({
  BuyFn,
  SellFn,
}: {
  BuyFn: () => void;
  SellFn: () => void;
}) {
  return (
    <>
      <div className="absolute hidden items-center right-0 justify-end opacity-90 group-hover:flex">
        <span>
          <Tooltip title="Buy" placement="top" arrow>
            <button
              onClick={BuyFn}
              className={` mr-2 flex h-[30px] w-10 cursor-pointer items-center justify-center rounded border-[0.7px] border-[#4184f3] bg-[#4184f3] text-[0.8rem] font-normal text-white`}
            >
              B
            </button>
          </Tooltip>
        </span>

        <span>
          <Tooltip title="Sell" placement="top" arrow>
            <button
              onClick={SellFn}
              className={` mr-2 flex h-[30px] w-10 cursor-pointer items-center justify-center rounded border-[0.7px] border-[#ff5722] bg-[#ff5722] text-[0.8rem] font-normal text-white `}
            >
              S
            </button>
          </Tooltip>
        </span>

        <span>
          <Tooltip title="Analytics" placement="top" arrow>
            <button
              className={` mr-2 flex h-[30px] w-10 cursor-pointer items-center justify-center rounded border-[0.7px] border-[#9b9b9b] bg-white hover:bg-[#d4d4d4] dark:bg-gray-800 dark:hover:bg-gray-700 `}
            >
              <BarChart className="scale-[0.7] text-[rgb(65,65,65)] dark:text-gray-300" />
            </button>
          </Tooltip>
        </span>

        <span>
          <Tooltip title="More" placement="top" arrow>
            <button
              className={` mr-2 flex h-[30px] w-10 cursor-pointer items-center justify-center rounded border-[0.7px] border-[#9b9b9b] bg-white hover:bg-[#d4d4d4] dark:bg-gray-800 dark:hover:bg-gray-700 `}
            >
              <MoreHorizontal className="scale-[0.7] text-[rgb(65,65,65)] dark:text-gray-300" />
            </button>
          </Tooltip>
        </span>
      </div>
    </>
  );
}
