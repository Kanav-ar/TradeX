import { createContext, useContext } from "react";
import type { IUser } from "../../types/user.types";

interface AuthContextType {
  currentUser: IUser | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthContextProvider");
  }

  return context;
}
