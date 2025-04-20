import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import Loginnav from "../Mycomponents/Loginnav";
import Footer from "../Mycomponents/Footer";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);
  const handlePasswordChange = (e) => setNewPassword(e.target.value);

  const sendOtp = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError("Please enter a valid email address");
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-reset-otp", { email });
      setIsOtpSent(true);
      setError("");
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      return setError("Please enter a valid 6-digit OTP");
    }

    try {
      await axios.post("http://localhost:5000/api/auth/verify-reset-otp", { email, otp });
      setIsVerified(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  const resetPassword = async () => {
    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword
      });
      setSuccess("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <>
      <Loginnav />
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <h2>Forgot Password</h2>
          
          {!isOtpSent ? (
            <div className="email-section">
              <p>Enter your email to receive a password reset OTP</p>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
              />
              <button onClick={sendOtp}>Send OTP</button>
            </div>
          ) : !isVerified ? (
            <div className="otp-section">
              <p>OTP sent to {email}</p>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
              />
              <button onClick={verifyOtp}>Verify OTP</button>
            </div>
          ) : (
            <div className="password-reset-section">
              <p>Enter your new password</p>
              <input
                type="password"
                value={newPassword}
                onChange={handlePasswordChange}
                placeholder="New password"
              />
              <button onClick={resetPassword}>Reset Password</button>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="back-to-login">
            <a href="/login">Back to Login</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;