import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { IUser } from "../../types/user.type";

interface AuthContextType {
  currentUser: IUser | null;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
  loading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>({
  currentUser: null,
  setCurrentUser: () => {},
  loading: false,
  logout: () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthContextProvider");
  }

  return context;
}
