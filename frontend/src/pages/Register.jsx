import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import instance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  });

  const allMet = Object.values(passwordCriteria).every(Boolean);

  useEffect(() => {
    const pwd = data.password;
    setPasswordCriteria({
      length: pwd.length >= 8,
      lower: /[a-z]/.test(pwd),
      upper: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    });
  }, [data.password]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!allMet) {
      setMessage({
        type: "error",
        text: "Please meet all password requirements",
      });
      return;
    }

    try {
      const res = await instance.post("/users/add", data);
      if (res.status === 201) {
        setMessage({ type: "success", text: "Registration successful" });
        setData({ name: "", email: "", username: "", password: "" });
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>

        {message.text && (
          <p className={message.type === "success" ? "success" : "error"}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
          <input
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Strong password"
              value={data.password}
              onChange={handleChange}
              className={!allMet && data.password ? "input-error" : ""}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {data.password && (
            <ul className="password-rules">
              <li className={passwordCriteria.length ? "met" : ""}>
                <FaCheck /> 8 characters
              </li>
              <li className={passwordCriteria.lower ? "met" : ""}>
                <FaCheck /> Lowercase
              </li>
              <li className={passwordCriteria.upper ? "met" : ""}>
                <FaCheck /> Uppercase
              </li>
              <li className={passwordCriteria.number ? "met" : ""}>
                <FaCheck /> Number
              </li>
              <li className={passwordCriteria.special ? "met" : ""}>
                <FaCheck /> Special char
              </li>
            </ul>
          )}

          <button disabled={!allMet}>Register</button>
        </form>

        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
