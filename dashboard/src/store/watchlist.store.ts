import { create } from "zustand";
import type { StockQuote, WatchlistStock } from "../api/watchlist.api";

interface WatchlistStore {
  stocks: WatchlistStock[];
  quotes: StockQuote[];
  setStocks: (stocks: WatchlistStock[]) => void;
  setQuotes: (quotes: StockQuote[]) => void;
  appendStocks: (stocks: WatchlistStock[]) => void;
  appendQuotes: (quotes: StockQuote[]) => void;
}

export const useWatchlistStore = create<WatchlistStore>((set) => ({
  stocks: [],
  quotes: [],

  setStocks: (stocks) => {
    set({ stocks });
  },

  appendStocks: (newStocks) => {
    set((state) => ({
      stocks: [...state.stocks, ...newStocks],
    }));
  },
  setQuotes: (quotes) => {
    set({ quotes });
  },

  appendQuotes: (newQuotes) => {
    set((state) => ({
      quotes: [...state.quotes, ...newQuotes],
    }));
  },
}));
