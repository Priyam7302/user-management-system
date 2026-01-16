import { createContext, useContext, useEffect, useState } from "react";
import instance from "../../axiosConfig.js"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Runs once when app loads (or refreshes)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await instance.get("/users/auth-check");
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  //  Login function
  const login = async (credentials) => {
    await instance.post("/users/login", credentials);
    const res = await instance.get("/users/auth-check");

    setUser(res.data.user);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = async () => {
    await instance.post("/users/logout");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
