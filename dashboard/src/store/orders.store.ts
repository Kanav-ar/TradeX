import { create } from "zustand";
import type { Order } from "../types/order.types";


interface OrderStore {
  allOrders: Order[];
  setAllOrders: (orders: Order[]) => void,
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  allOrders: [],

  setAllOrders:(orders)=>{
    set({
      allOrders: orders
    })
  },

  addOrder: (newOrder) => {
    set((state) => ({
      allOrders: [ newOrder,...state.allOrders],
    }));
  },
}));
