import { create } from "zustand";
import type { Holding } from "../types/holding.types";
import { getHoldings } from "../api/holding.api";

interface HoldingStore {
  allHoldings: Holding[];
  setAllHoldings: (holdings: Holding[]) => void;
  refreshHoldings: () => Promise<void>;
}

export const useHoldingStore = create<HoldingStore>((set) => ({
  allHoldings: [],

  setAllHoldings: (holdings) => {
    set({ allHoldings: holdings });
  },
  refreshHoldings: async () => {
    const holdings = await getHoldings();
    set({ allHoldings: holdings });
  },
}));
