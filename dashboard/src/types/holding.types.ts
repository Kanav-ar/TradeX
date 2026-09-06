export interface Holding {
  _id: string;
  owner: string;
  name: string;
  symbol: string;
  exchange: string;
  isin?: string;
  qty: number;
  avg: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}