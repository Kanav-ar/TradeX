import { create } from "zustand";
import type { Funds } from "../types/funds.types";
import { getFunds } from "../api/funds.api";

interface FundsStore {
  funds: Funds | null;
  setFunds: (funds: Funds) => void;
  refreshFunds: () => Promise<void>;
}

export const useFundsStore = create<FundsStore>((set) => ({
  funds: null,

  setFunds: (funds) => {
    set({
      funds,
    });
  },

  refreshFunds: async () => {
    const funds = await getFunds();
    set({ funds });
  },
}));
