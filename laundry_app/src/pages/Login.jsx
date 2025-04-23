import React, { useState } from 'react';
import InputField from '../components/InputField';
import { Link } from "react-router-dom";
import '../pages/Login.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
 
  const showToast = (message, type) => {
    if (type === 'error') toast.error(message);
    else toast.success(message);
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = formData;
 
    if (!email || !password || (!isLogin && !name)) {
      showToast("Please fill in all required fields", "error");
      return;
    }
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast("Invalid email format", "error");
      return;
    }
 
    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
 
    if (!isLogin && name.length < 2) {
      showToast("Name must be at least 2 characters", "error");
      return;
    }
 
    if (isLogin) {
      if (email.toLowerCase() !== 'admin@gmail.com' || password !== 'Password@5') {
        showToast("Incorrect email or password", "error");
        return;
      }
    }
 
    showToast(isLogin ? "Logged in successfully!" : "Account created!", "success");
    console.log(isLogin ? "Logging in..." : "Signing up...", formData);
  };
 
  return (
    <div className="login-container">
      <ToastContainer />
      <div className="image-section">
        <img
          src="https://cf.ltkcdn.net/cleaning/images/std/257114-800x515r1-how-properly-do-laundry.jpg"
          alt="Laundry"
          className="laundry-image"
        />
        <div className="image-text">
          <h1>Wash-O-Matic</h1>
          <p>Freshness Delivered.</p>
        </div>
      </div>
 
      <div className="form-section">
        <div className="form-wrapper">
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
 
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <InputField
                label="Name"
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                width="94%"
              />
            )}
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              width="94%"
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              width="94%"
            />
            <Link to="/home"><button type="submit" className="submit-btn">
              {isLogin ? 'Login' : 'Create Account'}
            </button></Link>
 
            {/* Social Login Icons with Redirect */}
            <div className="social-login">
              <p>Or continue with</p>
              <div className="social-icons">
                <button
                  className="social-btn google"
                  type="button"
                  onClick={() => window.open("https://accounts.google.com/signin", "_blank")}
                >
                  <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
                </button>
                <button
                  className="social-btn facebook"
                  type="button"
                  onClick={() => window.open("https://www.facebook.com/login", "_blank")}
                >
                  <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" alt="Facebook" />
                </button>
              </div>
            </div>
 
            {/* Guest Login Button */}
            <button
              type="button"
              className="guest-login-btn"
              onClick={() => showToast("Successfully logged in as Guest!", "success")}
            >
              Continue as Guest
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default LoginPage;