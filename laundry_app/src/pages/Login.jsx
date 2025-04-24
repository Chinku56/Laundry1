import React, { useState, useEffect } from 'react';
import InputField from '../components/InputField';
import { useNavigate } from 'react-router-dom';
import '../pages/Login.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
      if (email.toLowerCase() !== 'chinna123@gmail.com' || password !== '123456787') {
        showToast("Incorrect email or password", "error");
        return;
      }
    }

    sessionStorage.setItem('userData', JSON.stringify(formData));
    showToast(isLogin ? "Logged in successfully!" : "Account created!", "success");

    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="login-container">
      <ToastContainer />
      {loading ? (
        <Loader text="Freshness is just a spin away..." />
      ) : (
        <>
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
                    width="100%"
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
                  width="100%"
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  width="100%"
                />

                <button type="submit" className="submit-btn">
                  {isLogin ? 'Login' : 'Create Account'}
                </button>

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

                <button
                  type="button"
                  className="guest-login-btn"
                  onClick={() => {
                    showToast("Successfully logged in as Guest!", "success");
                    setTimeout(() => {
                      navigate("/home");
                    }, 1000);
                  }}
                >
                  Continue as Guest
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
