import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await login(data); // 🔥 AuthProvider handles everything
      navigate("/", { replace: true });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Login failed",
      });
    } finally {
      setLoading(false);
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
            <span onClick={() => setShowPassword((s) => !s)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
