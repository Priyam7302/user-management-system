import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // 🌙 Theme state (this is fine to keep in localStorage)
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleLogout = async () => {
    try {
      await logout(); // 🔥 backend + auth provider
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="header">
      <h2 className="logo">User Management System</h2>

      <nav className="nav">
        <Link to="/">Home</Link>

        {!isAuthenticated && <Link to="/register">Register</Link>}

        {!isAuthenticated ? (
          <Link to="/login">Login</Link>
        ) : (
          <button className="link-btn" onClick={handleLogout}>
            Logout
          </button>
        )}

        <button
          className="theme-btn"
          onClick={() => setIsDark((prev) => !prev)}
        >
          {isDark ? "☀ Light" : "🌙 Dark"}
        </button>
      </nav>
    </header>
  );
};

export default Header; 
