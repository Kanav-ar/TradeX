export interface Position {
  _id: string;
  owner: string;
  symbol: string;
  exchange: string;
  isin?: string;
  name: string;
  product: "CNC" | "MIS";
  qty: number;
  avg: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}