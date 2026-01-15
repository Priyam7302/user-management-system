import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  useEffect(() => {
    document.body.className = isDark ? "dark" : "";
  }, [isDark]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header">
      {/* Left */}
      <h2 className="logo">UserManagement System</h2>

      {/* Right */}
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

        <button className="theme-btn" onClick={() => setIsDark(!isDark)}>
          {isDark ? "☀ Light" : "🌙 Dark"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
