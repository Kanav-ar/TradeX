export type OrderSide = "BUY" | "SELL";

export type OrderProduct = "CNC" | "MIS";

export interface OrderDetails {
  symbol: string;
  exchange: string;
  isin?: string;
  name: string;
  price: number;
  side: OrderSide;
}

export interface Order {
  _id: string;
  owner: string;
  symbol: string;
  exchange: string;
  isin?: string;
  name: string;
  qty: number;
  price: number;
  side:  OrderSide;
  product: OrderProduct;
  status: "COMPLETED" | "FAILED";
  createdAt: string;
  updatedAt: string;
}