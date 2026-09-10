import { Outlet } from "react-router";
import { useAuth } from "../../context/Auth/AuthContext";
import Loading from "../../pages/Loading";


export default function ProtectedRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading/>;
  }

  if (!currentUser) {
    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/login`;
    return null;
  }

  return <Outlet />;
}