import React, { useState } from "react";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password?</h2>
        <p>Enter your email to receive a password reset link</p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
        ) : (
          <p className="success-message">
            If your email exists in our system, you’ll receive a reset link
            shortly.
          </p>
        )}

        <a href="/login" className="back-link">
          ← Back to Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
