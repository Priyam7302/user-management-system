import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import instance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await instance.post("/users/login", data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setMessage({
          type: "success",
          text: response.data.message,
        });

        setData({ username: "", password: "" });
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Login failed",
      });
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {message.text && (
          <p className={message.type === "success" ? "success" : "error"}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>

        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
