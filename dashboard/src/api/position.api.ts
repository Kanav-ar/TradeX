import type { Position } from "../types/position.types";
import { api } from "./axios";


export async function getPositions(): Promise<Position[]> {
  const response = await api.get("/positions");

  return response.data.data;
}