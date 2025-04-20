import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Loginnav from "../Mycomponents/Loginnav";
import Footer from "../Mycomponents/Footer";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);

      // Store user or token as needed
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Navigate to home or dashboard
      navigate("/User");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loginnav />
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-options">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {error && <div className="error-message">{error}</div>}

            <div className="login-footer">
              <p>
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
