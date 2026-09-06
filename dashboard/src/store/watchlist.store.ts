import { create } from "zustand";
import type { WatchlistStock } from "../api/watchlist.api";

interface WatchlistStore {
  stocks: WatchlistStock[];
  setStocks: (stocks: WatchlistStock[]) => void;
}

export const useWatchlistStore = create<WatchlistStore>((set) => ({
  stocks: [],

  setStocks: (stocks) => {
    set({ stocks });
  },
}));