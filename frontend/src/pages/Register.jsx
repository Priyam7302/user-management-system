import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import instance from "../../axiosConfig";

// 🔹 Regex rules
const emailRegex = /^[^\s@]{3,}@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-z0-9_]{4,}$/;

const Register = () => {
  const navigate = useNavigate();

  // 🔹 Form data
  const [data, setData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  // 🔹 UI states
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Validation states
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // 🔹 Password rules
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  });

  const passwordValid = Object.values(passwordRules).every(Boolean);

  // 🔐 Password validation
  useEffect(() => {
    const pwd = data.password;
    setPasswordRules({
      length: pwd.length >= 8,
      lower: /[a-z]/.test(pwd),
      upper: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    });
  }, [data.password]);

  // 🔹 Input handler
  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Email format validation
    if (name === "email") {
      if (!emailRegex.test(value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }

    // Username format validation
    if (name === "username") {
      if (!usernameRegex.test(value)) {
        setUsernameError("Username must be 4+ chars (lowercase, numbers, _)");
      } else {
        setUsernameError("");
      }
    }
  }

  // 🔍 Email uniqueness check
  async function handleEmailBlur() {
    if (!data.email || emailError) return;

    try {
      const res = await instance.get(
        `/users/check?field=email&value=${data.email}`
      );

      if (res.data.exists) {
        setEmailError("Email already exists");
      }
    } catch {
      setEmailError("Email check failed");
    }
  }

  // 🔍 Username uniqueness check
  async function handleUsernameBlur() {
    if (!data.username || usernameError) return;

    try {
      const res = await instance.get(
        `/users/check?field=username&value=${data.username}`
      );

      if (res.data.exists) {
        setUsernameError("Username already exists");
      }
    } catch {
      setUsernameError("Username check failed");
    }
  }

  // 🚀 Submit
  async function handleSubmit(e) {
    e.preventDefault();

    // Final defensive validation
    if (!data.name || !data.email || !data.username || !data.password) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    if (emailError || usernameError || !passwordValid) {
      setMessage({
        type: "error",
        text: "Please fix errors before submitting",
      });
      return;
    }

    try {
      const res = await instance.post("/users/add", data);

      if (res.status === 201) {
        setMessage({ type: "success", text: "Registration successful" });
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
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
            className={emailError ? "input-error" : ""}
          />
          {emailError && <p className="error">{emailError}</p>}

          <input
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            onBlur={handleUsernameBlur}
            className={usernameError ? "input-error" : ""}
          />
          {usernameError && <p className="error">{usernameError}</p>}

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Strong password"
              value={data.password}
              onChange={handleChange}
              className={!passwordValid && data.password ? "input-error" : ""}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {data.password && (
            <ul className="password-rules">
              <li className={passwordRules.length ? "met" : ""}>
                <FaCheck /> 8 characters
              </li>
              <li className={passwordRules.lower ? "met" : ""}>
                <FaCheck /> Lowercase
              </li>
              <li className={passwordRules.upper ? "met" : ""}>
                <FaCheck /> Uppercase
              </li>
              <li className={passwordRules.number ? "met" : ""}>
                <FaCheck /> Number
              </li>
              <li className={passwordRules.special ? "met" : ""}>
                <FaCheck /> Special character
              </li>
            </ul>
          )}

          <button disabled={emailError || usernameError || !passwordValid}>
            Register
          </button>
        </form>

        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
