import { api } from "./axios";

export interface WatchlistStock {
  symbol: string;
  isin: string;
  company_name: string;
  exchange: string;
  sector: string | null;
  is_active: boolean;
  market_cap: number;
}

interface WatchlistResponse {
  stocks: WatchlistStock[];
  pagination: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export async function getWatchlist(
  page = 1,
  pageSize = 50,
): Promise<WatchlistResponse> {
  const response = await api.get("/watchlist", {
    params: {
      page,
      page_size: pageSize,
      active_only: true,
    },
  });

  return response.data.data;
}