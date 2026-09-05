import type { ReactNode } from "react";
import { useState } from "react";
import { OrderWindowContext } from "./OrderWindowContext";
import OrderWindow from "../../components/OrderWindow";
import type { OrderDetails } from "../../types/order.types";

interface OrderWindowContextProviderProps {
  children: ReactNode;
}

export default function BuyWindowContextProvider({
  children,
}: OrderWindowContextProviderProps) {
  const [selectedStockDetails, setSelectedStockDetails] =
    useState<OrderDetails | null>(null);

  function openOrderWindow(order: OrderDetails) {
    setSelectedStockDetails(order);
  }

  function closeOrderWindow() {
    setSelectedStockDetails(null);
  }

  return (
    <OrderWindowContext.Provider
      value={{
        openOrderWindow,
        closeOrderWindow,
      }}
    >
      {children}
      {/* when there is an order, only then render the order window */}
      {selectedStockDetails && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]" />

          <OrderWindow
            symbol={selectedStockDetails.symbol}
            exchange={selectedStockDetails.exchange}
            isin={selectedStockDetails.isin}
            name={selectedStockDetails.name}
            price={selectedStockDetails.price}
            side={selectedStockDetails.side}
            onClose={closeOrderWindow}
          />
        </>
      )}
    </OrderWindowContext.Provider>
  );
}
