import { ArrowDown, ArrowUp, BarChart, MoreHorizontal } from "lucide-react";
import { Tooltip } from "@mui/material";
import { watchlist } from "../data/data";
import useOrderWindow from "../context/Order/OrderWindowContext";
import { useEffect } from "react";
import { api } from "../api/axios";

const WatchList = () => {
  // useEffect(() => {
  //   (async() => {
  //     const data = await api("/watchlist")

  //     console.log("frontend\n",data)
  //   })()
  // },[])

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
          {watchlist.length}/50
        </span>
      </div>

      <ul className="flex-1 overflow-y-auto pb-20">
        {watchlist.map((stock) => (
          <WatchListItem
            key={stock.name}
            name={stock.name}
            price={stock.price}
            percent={stock.percent}
            isDown={stock.isDown}
          />
        ))}
      </ul>
    </div>
  );
};

export default WatchList;

interface WatchListItemProps {
  name: string;
  price: number;
  percent: string;
  isDown: boolean;
}

function WatchListItem({ name, price, percent, isDown }: WatchListItemProps) {
  const { openOrderWindow } = useOrderWindow();
  return (
    <li className="relative border-b-[1px] border-gray-200 px-4 py-3 dark:border-gray-800 hover:cursor-move hover:bg-[#f3f3f3] dark:hover:bg-[#111827] group ">
      <div className="relative flex items-center justify-between text-[0.8rem] font-light">
        <div className="flex justify-between items-center gap-6 xl:gap-8 w-full">
          <span className="mr-2 flex-1 text-[rgb(141, 141, 141)] dark:text-gray-400">
            {name}
          </span>

          <div className="flex xl:flex-1 flex-2 lg:px-4 justify-between gap-4">
            <span
              className={`
                  ${
                    isDown
                      ? "text-[rgb(223,73,73)] dark:text-red-400"
                      : "text-[rgb(103,201,136)] dark:text-green-400"
                  }
                `}
            >
              <div className="flex items-center w-20 gap-2 justify-end">
                {percent}
                <span className="flex items-center">
                  {isDown ? (
                    <ArrowDown className="text-xs" />
                  ) : (
                    <ArrowUp className="text-xs" />
                  )}
                </span>
              </div>
            </span>

            <span
              className={`
                flex items-center
              ${
                isDown
                  ? "text-[rgb(223,73,73)] dark:text-red-400"
                  : "text-[rgb(103,201,136)] dark:text-green-400"
              }
            `}
            >
              {price.toFixed(2)}
            </span>
          </div>
        </div>

        <WatchListActions
          BuyFn={() =>
            openOrderWindow({
              symbol: name,
              exchange: "NSE",
              name,
              price,
              side: "BUY",
            })
          }
          SellFn={() =>
            openOrderWindow({
              symbol: name,
              exchange: "NSE",
              name,
              price,
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
