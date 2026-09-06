import type { Order, OrderDetails, OrderProduct } from "../types/order.types";
import { api } from "./axios";

export async function getOrders(): Promise<Order[]> {
  const response = await api.get("/orders");

  return response.data.data;
}

export async function buyOrder(
  order: Omit<OrderDetails, "side"> & {
    qty: number;
    product: OrderProduct;
  },
): Promise<Order> {
  const response = await api.post("/orders/buy", order);

  return response.data.data;
}

export async function sellOrder(
  order: Omit<OrderDetails, "side"> & {
    qty: number;
    product: OrderProduct;
  },
): Promise<Order> {
  const response = await api.post("/orders/sell", order);

  return response.data.data;
}
