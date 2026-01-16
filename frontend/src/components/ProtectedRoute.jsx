import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Wait for auth-check to finish
  if (loading) {
    return <p>Checking authentication...</p>;
  }

  // Allow or block
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
