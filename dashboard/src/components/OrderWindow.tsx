import { useState } from "react";
import type { OrderDetails, OrderProduct } from "../types/order.types";
import { useOrderStore } from "../store/orders.store";
import { buyOrder, sellOrder } from "../api/order.api";

interface OrderActionWindowProps extends OrderDetails {
  onClose: () => void;
}

interface StockDetails {
  price: number;
  quantity: number;
}

export default function OrderWindow({
  symbol,
  exchange,
  isin,
  name,
  price,
  side,
  onClose,
}: OrderActionWindowProps) {
  const [stockDetails, setStockDetails] = useState<StockDetails>({
    price: price,
    quantity: 1,
  });

  const addOrder = useOrderStore((state) => state.addOrder);

  const [product, setProduct] = useState<OrderProduct>("CNC");

  async function handleBuyClick() {
    try {
      const order = await buyOrder({
        symbol,
        exchange,
        isin,
        name,
        qty: stockDetails.quantity,
        price: stockDetails.price,
        product,
      });

      addOrder(order);
      onClose();
    } catch (error) {
      console.error("BUY ORDER FAILED:", error);
    }
  }

  async function handleSellClick() {
    try {
      const order = await sellOrder({
        symbol,
        exchange,
        isin,
        name,
        qty: stockDetails.quantity,
        price: stockDetails.price,
        product,
      });

      addOrder(order);
      onClose();
    } catch (error) {
      console.error("SELL ORDER FAILED:", error);
    }
  }

  return (
    <div className="fixed right-6 top-1/2 z-50 w-96 -translate-y-1/2 rounded-2xl border border-black/10 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111827]/95">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {side === "BUY" ? <>BUY</> : <>SELL</>}
          </p>

          <h2 className="text-xl font-semibold dark:text-white">{symbol}</h2>
        </div>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ✕
        </button>
      </div>

      <OrderInput
        name="Quantity"
        inpType="number"
        value={stockDetails.quantity}
        onChange={(value) =>
          setStockDetails((prev) => ({
            ...prev,
            quantity: Number(value),
          }))
        }
      />

      <OrderInput
        name="Price"
        inpType="number"
        value={stockDetails.price}
        onChange={(value) =>
          setStockDetails((prev) => ({
            ...prev,
            price: Number(value),
          }))
        }
      />
      <div className="mt-6">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Product
        </label>

        <div className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={() => setProduct("CNC")}
            className={`flex-1 rounded-lg border py-2 font-medium transition ${
              product === "CNC"
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-200 text-gray-600 dark:border-white/10 dark:text-gray-400"
            }`}
          >
            CNC
          </button>

          <button
            type="button"
            onClick={() => setProduct("MIS")}
            className={`flex-1 rounded-lg border py-2 font-medium transition ${
              product === "MIS"
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-200 text-gray-600 dark:border-white/10 dark:text-gray-400"
            }`}
          >
            MIS
          </button>
        </div>
      </div>
      {side === "BUY" ? (
        <button
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:cursor-pointer hover:bg-blue-800"
          onClick={handleBuyClick}
        >
          BUY
        </button>
      ) : (
        <button
          className="mt-6 w-full rounded-lg bg-orange-600 py-3 font-medium text-white transition hover:cursor-pointer hover:bg-orange-800"
          onClick={handleSellClick}
        >
          SELL
        </button>
      )}
    </div>
  );
}

interface OrderInputProps {
  name: string;
  inpType: "text" | "number";
  value: string | number;
  onChange: (value: string) => void;
}

function OrderInput({ name, inpType, value, onChange }: OrderInputProps) {
  return (
    <div className="mt-6">
      <label className="text-sm text-gray-600 dark:text-gray-400">{name}</label>

      <input
        type={inpType}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-blue-500 dark:border-white/10 dark:text-white"
      />
    </div>
  );
}
