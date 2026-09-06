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

export interface StockQuote {
  symbol: string;
  company_name: string | null;
  trade_date: string | null;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  prev_close: number | null;
  change_pct: number | null;
  volume: number | null;
  found: boolean;
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

export async function getStockQuotes(symbols: string[]): Promise<StockQuote[]> {
  if (symbols.length === 0) {
    return [];
  }

  const response = await api.get("/watchlist/quotes", {
    params: {
      symbols: symbols.join(","),
    },
  });
  
  return response.data.data;
}
