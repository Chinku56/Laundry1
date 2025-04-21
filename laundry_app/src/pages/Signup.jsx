import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import './Signup.scss';

function Signup() {
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();  // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !emailOrPhone || !password || !confirmPassword) {
      setError('Please enter all required details.');
      setSuccessMessage('');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccessMessage('');
      return;
    }

    setError('');
    setSuccessMessage('Account created successfully!');
    console.log({ name, emailOrPhone, password });
  };

  const handleLoginClick = () => {
    navigate('/login');  // Navigate to Login page
  };

  return (
    <div className="signup-container">
      <div className="top-bar">
        <button className="login-button" onClick={handleLoginClick}>
          Log In
        </button>
      </div>

      <div className="signup-card">
        <div className="left-section">
          <h2 className="signup-title">SIGN UP</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="emailOrPhone">Email or Phone</label>
              <input
                type="text"
                id="emailOrPhone"
                placeholder="Enter your email or phone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <button type="submit" className="signup-submit-button">
              Create Account
            </button>
          </form>

          <div className="social-icons">
            <FaGoogle className="icon google" />
            <FaTwitter className="icon twitter" />
            <FaFacebook className="icon facebook" />
            <FaInstagram className="icon instagram" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
