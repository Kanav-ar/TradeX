import { create } from "zustand";
import type { Position } from "../types/position.types";
import { getPositions } from "../api/position.api";

interface PositionStore {
  allPositions: Position[];
  setAllPositions: (positions: Position[]) => void;
  refreshPositions: () => Promise<void>;
}

export const usePositionStore = create<PositionStore>((set) => ({
  allPositions: [],

  setAllPositions: (positions) => {
    set({
      allPositions: positions,
    });
  },

  refreshPositions: async () => {
    const positions = await getPositions();
    set({ allPositions: positions });
  },
}));
