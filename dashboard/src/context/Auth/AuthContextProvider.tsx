import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { AuthContext } from "./AuthContext";
import type { IUser } from "../../types/user.types";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [currentUser, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await api.get("/users/me");
        setUser(response.data.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
