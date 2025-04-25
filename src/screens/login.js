import React, { useState } from "react";  // Add useState and useEffect here
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
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    setError(""); // Clear error when user types
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);

          // Send the latitude and longitude to the backend for location processing
          axios
            .post("http://localhost:5000/api/location", { latitude, longitude })
            .then((response) => {
              console.log("Location Response:", response.data);  // Handle location response
            })
            .catch((error) => {
              console.error("Error fetching location data:", error);
            });
        },
        (err) => {
          setError("Geolocation not available or user denied permission");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation not supported by this browser");
    }
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

    // Get user's location before submitting login
    getLocation();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        latitude,  // Send latitude to backend
        longitude  // Send longitude to backend
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/User");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError("Invalid email or password");
        } else {
          setError(err.response.data.message || "Login failed");
        }
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred");
      }
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
              disabled={loading}
              className={loading ? "loading" : ""}
            >
              {loading ? (
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
