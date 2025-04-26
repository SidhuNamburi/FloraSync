import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Loginnav from "../Mycomponents/Loginnav";
import Footer from "../Mycomponents/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject("Unable to retrieve your location.");
          },
          {
            enableHighAccuracy: true, 
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Client-side validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }
  
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
  
    setLoading(true);
    setError("");
    setLocationLoading(true); // Start location loading
  
    try {
      // Get location from the browser (HTML5 geolocation)
      const locationData = await getUserLocation();
  
      // Proceed with login request, sending location data to backend
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });
  
      // Send location data to update the user's location in the backend
      await axios.post(
        "http://localhost:5000/api/location",
        {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`, // Pass the token to authenticate
          },
        }
      );
  
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      navigate("/User");
    } catch (err) {
      // Error handling
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
      setLocationLoading(false); // End location loading
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
                autoComplete="email"
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
                autoComplete="current-password"
              />
            </div>

            <div className="form-options">
              <button
                type="button"
                className="link-button"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || locationLoading}
              className={loading || locationLoading ? "loading" : ""}
            >
              {loading || locationLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {error && <div className="error-message">{error}</div>}

            <div className="login-footer">
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
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
