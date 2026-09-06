import { createContext, useContext } from "react";
import type { OrderDetails } from "../../types/order.types";

interface OrderWindowContextType {
  openOrderWindow: (order: OrderDetails) => void;
  closeOrderWindow: () => void;
}

export const OrderWindowContext = createContext<OrderWindowContextType | undefined>(undefined);

export default function useOrderWindow() {
  const context = useContext(OrderWindowContext);

  if (!context) {
    throw new Error(
      "useOrderWindow must be used inside OrderWindowContextProvider",
    );
  }

  return context;
}
