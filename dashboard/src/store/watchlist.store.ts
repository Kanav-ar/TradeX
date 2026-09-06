import { create } from "zustand";
import type { StockQuote, WatchlistStock } from "../api/watchlist.api";

interface WatchlistStore {
  stocks: WatchlistStock[];
  quotes: StockQuote[];
  setStocks: (stocks: WatchlistStock[]) => void;
  setQuotes: (quotes: StockQuote[]) => void;
}

export const useWatchlistStore = create<WatchlistStore>((set) => ({
  stocks: [],
  quotes: [],

  setStocks: (stocks) => {
    set({ stocks });
  },
  setQuotes: (quotes) => {
    set({ quotes });
  },
}));
