import { api } from "./axios";

export interface WatchlistStock {
  symbol: string;
  exchange: string;
  isin?: string;
  name: string;
  price: number;
  percent: string;
  isDown: boolean;
}

export async function getWatchlist(): Promise<WatchlistStock[]> {
  const response = await api.get("/watchlist");

  return response.data.data.stocks;
}