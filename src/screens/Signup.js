import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Loginnav from "../Mycomponents/Loginnav";
import Footer from "../Mycomponents/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in, and redirect if so
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.id]: "",
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // ✅ Save token and user info
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("username", user.username);

      // ✅ Show success and redirect
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/user"), 1500);
    } catch (err) {
      setErrors({
        ...errors,
        server: err.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loginnav />
      <div className="signup-container">
        <div className="signup-card">
          <h2>Create Account</h2>
          <p>Join us by filling in your details below</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>

            {errors.server && (
              <div className="error-message">{errors.server}</div>
            )}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? (
                <span className="spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
