import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Loader from '../components/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('login'); 
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    name: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, emailOrPhone: savedEmail }));
      setRememberMe(true);
    }

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const resetForm = () => {
    setFormData({
      emailOrPhone: rememberMe ? formData.emailOrPhone : '',
      password: '',
      name: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const showToast = (message, type) => {
    if (type === 'error') toast.error(message);
    else toast.success(message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { emailOrPhone, password, name } = formData;

    if (!emailOrPhone || !password || (!isLogin && !name)) {
      return showToast("Please fill in all required fields", "error");
    }
    if (!validateEmail(emailOrPhone) && !validatePhone(emailOrPhone)) {
      return showToast("Invalid email or phone number", "error");
    }

    if (password.length < 6) return showToast("Password must be at least 6 characters", "error");

    if (!isLogin && name.length < 2) return showToast("Name must be at least 2 characters", "error");

    if (isLogin) {
      if (
        (emailOrPhone.toLowerCase() !== 'admin@gmail.com' && emailOrPhone !== '1234567890') || 
        password !== 'Password@5'
      ) {
        return showToast("Incorrect email/phone or password", "error");
      }
    }

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', emailOrPhone);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    sessionStorage.setItem('userData', JSON.stringify(formData));
    showToast(isLogin ? "Logged in successfully!" : "Account created!", "success");
    setTimeout(() => navigate("/home"), 1000);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    const { emailOrPhone } = formData;

    if (!emailOrPhone) return showToast("Please enter your email or phone", "error");
    if (!validateEmail(emailOrPhone) && !validatePhone(emailOrPhone)) {
      return showToast("Please enter a valid email or phone number", "error");
    }

    showToast("Reset link sent to email or OTP sent to phone!", "success");
    setView('otp');
    resetForm();
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    if (formData.otp !== '123456') return showToast("Invalid OTP", "error");
    showToast("OTP verified!", "success");
    setView('reset');
    resetForm();
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;
    if (!newPassword || !confirmPassword) return showToast("All fields are required", "error");
    if (newPassword.length < 6) return showToast("Password must be at least 6 characters", "error");
    if (newPassword !== confirmPassword) return showToast("Passwords do not match", "error");

    showToast("Password reset successfully!", "success");
    setTimeout(() => {
      setView('login');
      resetForm();
    }, 1000);
  };

  const renderLoginSignup = () => (
    <>
      <div className="toggle-buttons">
        <button className={`toggle-btn ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); resetForm(); }}>Login</button>
        <button className={`toggle-btn ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); resetForm(); }}>Sign Up</button>
      </div>

      <form onSubmit={handleLoginSubmit}>
        {!isLogin && (
          <InputField label="Name" name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required width="100%" />
        )}
        <InputField label="Email or Phone" name="emailOrPhone" type="text" placeholder="Email or Phone" value={formData.emailOrPhone} onChange={handleChange} required width="100%" />
        <InputField label="Password" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required width="100%" />

        {isLogin && (
          <div className="extra-options" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="remember-me">
              <input style={{width: "10%"}}
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <p className="forgot-link" style={{ cursor: "pointer", margin: 0 }} onClick={() => { setView('forgot'); resetForm(); }}>
              Forgot Password?
            </p>
          </div>
        )}

        <button type="submit" className="submit-btn">{isLogin ? 'Login' : 'Create Account'}</button>

        <div className="social-login">
          <p>Or continue with</p>
          <div className="social-icons">
            <button className="social-btn google" type="button" onClick={() => window.open("https://accounts.google.com/signin", "_blank")}>
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
            </button>
            <button className="social-btn facebook" type="button" onClick={() => window.open("https://www.facebook.com/login", "_blank")}>
              <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" alt="Facebook" />
            </button>
            <button className="social-btn twitter" type="button" onClick={() => window.open("https://twitter.com/login", "_blank")}>
              <img src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="Twitter" />
            </button>
          </div>
        </div>

        <button type="button" className="guest-login-btn" onClick={() => {
          showToast("Successfully logged in as Guest!", "success");
          setTimeout(() => navigate("/home"), 1000);
        }}>
          Continue as Guest
        </button>
      </form>
    </>
  );

  const renderForgotPassword = () => (
    <form onSubmit={handleForgotSubmit}>
      <h2>Forgot Password</h2>
      <InputField
        label="Email or Phone"
        name="emailOrPhone"
        type="text"
        placeholder="Enter your email or phone"
        value={formData.emailOrPhone}
        onChange={handleChange}
        required
        width="100%"
      />
      <button type="submit" className="submit-btn">Send OTP</button>
      <p className="back-link" style={{ cursor: "pointer" }} onClick={() => { setView('login'); resetForm(); }}>Back to Login</p>
    </form>
  );

  const renderOTPVerification = () => (
    <form onSubmit={handleOTPSubmit}>
      <h2>Enter OTP</h2>
      <InputField label="OTP" name="otp" type="text" placeholder="6-digit OTP" value={formData.otp} onChange={handleChange} required width="100%" />
      <button type="submit" className="submit-btn">Verify OTP</button>
    </form>
  );

  const renderResetPassword = () => (
    <form onSubmit={handleResetSubmit}>
      <h2>Reset Password</h2>
      <InputField label="New Password" name="newPassword" type="password" placeholder="New Password" value={formData.newPassword} onChange={handleChange} required width="100%" />
      <InputField label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required width="100%" />
      <button type="submit" className="submit-btn">Reset Password</button>
    </form>
  );

  return (
    <div className="login-container">
      <ToastContainer />
      {loading ? (
        <Loader text="Freshness is just a spin away..." />
      ) : (
        <>
          <div className="image-section">
            <img src="https://cf.ltkcdn.net/cleaning/images/std/257114-800x515r1-how-properly-do-laundry.jpg" alt="Laundry" className="laundry-image" />
            <div className="image-text">
              <h1>Wash-O-Matic</h1>
              <p>Freshness Delivered.</p>
            </div>
          </div>

          <div className="auth-section">
            <div className="form-wrapper">
              {view === 'login' && renderLoginSignup()}
              {view === 'forgot' && renderForgotPassword()}
              {view === 'otp' && renderOTPVerification()}
              {view === 'reset' && renderResetPassword()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
