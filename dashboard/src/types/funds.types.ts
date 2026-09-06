export interface Funds {
  _id: string;
  owner: string;
  availableCash: number;
  usedMargin: number;
  payin: number;
  openingBalance: number;
  createdAt: string;
  updatedAt: string;
}