import { ArrowDown, ArrowUp, BarChart, MoreHorizontal } from "lucide-react";
import { Tooltip } from "@mui/material";
import useOrderWindow from "../context/Order/OrderWindowContext";
import { useEffect, useState } from "react";
import { getStockQuotes, getWatchlist } from "../api/watchlist.api";
import { useWatchlistStore } from "../store/watchlist.store";

const WatchList = () => {
  const { stocks, quotes, setStocks, setQuotes, appendQuotes, appendStocks } =
    useWatchlistStore();
  const quoteMap = new Map(quotes.map((quote) => [quote.symbol, quote]));
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getWatchlist(1, 50, debouncedSearch);

        setStocks(data.stocks);
        setQuotes([]);

        setPage(1);
        setTotalPages(data.pagination.total_pages);

        try {
          const symbols = data.stocks.map((stock) => stock.symbol);

          if (symbols.length > 0) {
            const quoteData = await getStockQuotes(symbols);
            setQuotes(quoteData);
          }
        } catch (quoteError) {
          console.error("Failed to fetch stock quotes:", quoteError);
        }
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
        setError("Unable to load stocks");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [debouncedSearch, setStocks, setQuotes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 2000);

    return () => clearTimeout(timer);
  }, [search]);

  const loadMore = async () => {
    if (loadingMore || page >= totalPages) {
      return;
    }

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const data = await getWatchlist(nextPage, 50, debouncedSearch);

      const symbols = data.stocks.map((stock) => stock.symbol);

      const quoteData = symbols.length > 0 ? await getStockQuotes(symbols) : [];

      appendStocks(data.stocks);
      appendQuotes(quoteData);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more stocks:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className=" hidden lg:block lg:basis-[32%] h-viewport overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-[#070d17] dark:shadow-none transition-colors duration-200">
      <div className="relative flex items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="w-full border-b border-gray-200 bg-transparent px-5 py-4 pr-20 text-[0.9rem] font-normal text-gray-700 placeholder:text-gray-400 outline-none dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500"
        />

        <span
          className=" absolute right-5 text-[0.9rem] font-normal text-gray-400 dark:text-gray-500
          "
        >
          {stocks.length}/50
        </span>
      </div>

      {loading ? (
        <div className="flex h-50 flex-col justify-center gap-4 p-6 text-center text-sm text-gray-400">
          <b className="text-xl">Loading...</b>
        </div>
      ) : error ? (
        <div className="flex h-50 items-center justify-center p-6 text-center text-sm text-gray-400">
          {error}
        </div>
      ) : (
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

          {page < totalPages && (
            <li className="border-t border-gray-200 p-3 dark:border-gray-800">
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className="w-full rounded-md py-2 text-sm text-blue-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-blue-400 dark:hover:bg-gray-800"
              >
                {loadingMore ? "Loading..." : "Load more"}
              </button>
            </li>
          )}
        </ul>
      )}
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
          BuyFn={() => {
            if (price === null) return;
            openOrderWindow({
              symbol,
              exchange,
              isin,
              name,
              price: price ?? 0,
              side: "BUY",
            });
          }}
          SellFn={() => {
            if (price === null) return;
            openOrderWindow({
              symbol,
              exchange,
              isin,
              name,
              price: price ?? 0,
              side: "SELL",
            });
          }}
          disabled={price === null}
        />
      </div>
    </li>
  );
}

function WatchListActions({
  BuyFn,
  SellFn,
  disabled,
}: {
  BuyFn: () => void;
  SellFn: () => void;
  disabled: boolean;
}) {
  return (
    <>
      <div className="absolute hidden items-center right-0 justify-end opacity-90 group-hover:flex">
        <span>
          <Tooltip title="Buy" placement="top" arrow>
            <button
              onClick={BuyFn}
              disabled={disabled}
              className={`mr-2 flex h-[30px] w-10 items-center justify-center rounded border-[0.7px] border-[#4184f3] bg-[#4184f3] text-[0.8rem] font-normal text-white ${
                disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
              }`}
            >
              B
            </button>
          </Tooltip>
        </span>

        <span>
          <Tooltip title="Sell" placement="top" arrow>
            {/* <button
              onClick={SellFn}
              className={` mr-2 flex h-[30px] w-10 cursor-pointer items-center justify-center rounded 
                border-[0.7px] border-[#ff5722] bg-[#ff5722] text-[0.8rem] font-normal text-white `}
            >
              S
            </button> */}
            <button
              onClick={SellFn}
              disabled={disabled}
              className={`mr-2 flex h-[30px] w-10 items-center justify-center rounded border-[0.7px] border-[#ff5722] bg-[#ff5722] text-[0.8rem] font-normal text-white ${
                disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
              }`}
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
