import type { Holding } from "../types/holding.types";
import { api } from "./axios";


export async function getHoldings(): Promise<Holding[]> {
  const response = await api.get("/holdings");

  return response.data.data;
}