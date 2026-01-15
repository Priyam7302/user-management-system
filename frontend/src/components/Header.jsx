import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Initialize theme once (dark by default)
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  // ✅ Apply theme to body
  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <h2 className="logo">UserManagement System</h2>

      <nav className="nav">
        <Link to="/">Home</Link>

        {!isLoggedIn && <Link to="/register">Register</Link>}

        {!isLoggedIn ? (
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
