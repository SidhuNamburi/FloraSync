import React, { useState } from "react";
import "./ForgotPassword.css";
import Loginnav from "../Mycomponents/Loginnav";
import Footer from "../Mycomponents/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOtp = () => {
    if (/\S+@\S+\.\S+/.test(email)) {
      setIsOtpSent(true);
      setError("");
    } else {
      setError("Please enter a valid email address.");
    }
  };

  const verifyOtp = () => {
    if (otp === "123456") {  // This is a dummy check for the OTP
      setIsVerified(true);
      setError("");
    } else {
      setError("Invalid OTP.");
    }
  };

  const cancelProcess = () => {
    setEmail("");
    setOtp("");
    setIsOtpSent(false);
    setIsVerified(false);
    setError("");
  };

  return (
    <>
      <Loginnav />
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <div className="forgot-password-header">
            <h2>Forgot Password</h2>
            <p>Enter your email to receive an OTP and reset your password</p>
          </div>

          {!isOtpSent ? (
            <div className="email-section">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
              />
              <button onClick={sendOtp} className="send-otp-button">
                Send OTP
              </button>
              {error && <span className="error-message">{error}</span>}
            </div>
          ) : (
            <div className="otp-section">
              <p>
                An OTP has been sent to <strong>{email}</strong>.
              </p>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
              />
              <div className="otp-actions">
                <button onClick={verifyOtp} className="verify-button">
                  Verify
                </button>
                <button onClick={cancelProcess} className="cancel-button">
                  Cancel
                </button>
              </div>
              {error && <span className="error-message">{error}</span>}
            </div>
          )}

          {isVerified && (
            <div className="success-message">
              <p>OTP verified successfully. You can now reset your password.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
