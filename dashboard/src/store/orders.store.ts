import { create } from "zustand";
import type { Order } from "../types/order.types";
import { getOrders } from "../api/order.api";

interface OrderStore {
  allOrders: Order[];
  setAllOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  refreshOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set) => ({
  allOrders: [],

  setAllOrders: (orders) => {
    set({
      allOrders: orders,
    });
  },

  addOrder: (newOrder) => {
    set((state) => ({
      allOrders: [newOrder, ...state.allOrders],
    }));
  },

  refreshOrders: async () => {
    const orders = await getOrders();

    set({
      allOrders: orders,
    });
  },
}));
