// import React, { useState } from 'react';
// import './Login.scss'; // Import the SCSS file

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleRememberMeChange = (event) => {
//     setRememberMe(event.target.checked);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Implement your login logic here
//     console.log('Email:', email, 'Password:', password, 'Remember Me:', rememberMe);
//     alert(`Logging in with Email: ${email}`);
//   };

//   return (
//     <div className="login-container">
//       <div className="left-section">
//         <div className="logo">
//           {/* Replace with your actual logo */}
//           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f26b5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9z"></path>
//             <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
//           </svg>
//           <span className="logo-text">YourBrand</span>
//         </div>
//         <h2 className="login-title">Log In</h2>
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="input-group">
//             <label htmlFor="email">email Id</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={handleEmailChange}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={handlePasswordChange}
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="options">
//             <label className="remember-me">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={handleRememberMeChange}
//               />
//               Remember me
//             </label>
//             <a href="/forgot-password" className="forgot-password">
//               Forgot password
//             </a>
//           </div>
//           <button type="submit" className="login-button">
//             Log In
//           </button>
//         </form>
//         <div className="social-login">
//           <hr className="separator" />
//           <span className="or-text">or</span>
//           <div className="social-icons">
//             <a href="/login/google" className="google-icon">
//               {/* Replace with your Google icon */}
//               <svg viewBox="0 0 48 48">
//                 <path fill="#fbc02d" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C36.31 2.29 30.77.27 24 .3 14.03.3 5.62 6.18 2.29 14.22l6.18 4.99C9.86 14.09 15.24 9.5 24 9.5z"/>
//                 <path fill="#3cba54" d="M3.6 14.29l6.15 4.93C9.86 19.09 15.24 24 24 24s14.14-4.91 14.14-4.91l6.33 5.06C39.56 34.45 24 40 24 39.97 14.03 39.97 5.62 34.09 2.29 26.05l6.18-4.99z"/>
//                 <path fill="#4285f4" d="M38.3 24c0-3.54-1.22-6.71-3.6-9.21l-6.85 6.85C34.14 19.09 28.76 24 24 24s-10.14-4.91-14.14-4.91l-6.33 5.06C5.44 14.55 21 9 24 8.97c9.97 0 18.38 5.82 21.71 13.86z"/>
//                 <path fill="#e53935" d="M24 47.7c9.86 0 18.24-5.91 21.6-14.02l-6.18-4.99C34.14 34.91 28.76 40 24 40s-10.14-5.09-14.14-5.09l-6.33 5.06C5.44 34.45 21 40 24 39.97c0 0 0 0 0 0z"/>
//               </svg>
//             </a>
//             <a href="/login/twitter" className="twitter-icon">
//               {/* Replace with your Twitter icon */}
//               <svg viewBox="0 0 512 512">
//                 <path fill="#1da1f2" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.7-99.77 298.058-298.058 298.058-59.852 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.624 25.34 1.624 49.058 0 94.2-31.693 109.946-83.741-44.999-.825-81.082-30.05-94.617-69.691 6.215 1.149 12.69 1.825 19.382 1.825 9.421 0 18.223-1.324 26.164-3.544-46.116-9.252-79.217-49.867-79.217-97.655v-1.259c13.218 3.624 27.288 5.721 41.606 5.721-24.305-16.433-40.015-44.786-40.015-75.492 0-16.61 5.896-31.78 15.75-44.505 43.136 53.98 101.705 90.586 162.937 95.586-9.25-36.45-14.227-78.13-14.227-122.08 0-28.827 10.044-52.08 27.938-70.121 14.094-15.705 31.408-25.122 50.336-25.122 9.056 0 17.991 1.624 26.004 4.647-8.312-26.607-25.301-44.44-48.572-44.44-46.076 0-83.414 37.338-83.414 83.414v1.046c0 11.595.325 22.915.325 34.23 0 21.452-16.609 41.417-41.679 41.417-8.105 0-15.947-.453-23.788-1.291 16.612 12.977 31.156 29.093 40.086 49.675z"/>
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="right-section">
//         <img src="/assets/images/dress.png" alt="dress"></img>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.scss';

function Login() {
  const navigate = useNavigate();  // Use the navigate hook to handle navigation
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const validEmail = 'jhansi@gmail.com';
  const validPhone = '6304898204';
  const validPassword = 'jhanu@26';

  const handleEmailOrPhoneChange = (event) => {
    setEmailOrPhone(event.target.value);
    setError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError('');
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!emailOrPhone || !password) {
      setError('Please enter both Email/Phone and Password.');
      return;
    }

    const isValidUser =
      (emailOrPhone === validEmail || emailOrPhone === validPhone) &&
      password === validPassword;

    if (isValidUser) {
      alert(`Successfully logged in as ${emailOrPhone}`);
      console.log('Login successful!');
    } else {
      setError('Invalid email/phone or password. Please try again.');
    }
  };

  const handleContinueAsGuest = () => {
    alert('Continuing as Guest (limited flow)');
    console.log('Guest flow');
  };

  const navigateToSignup = () => {
    navigate('/signup');  // Navigate to the Sign Up page
  };

  return (
    <div className="login-container">
      <div className="top-bar">
        <button className="signup-button" onClick={navigateToSignup}>
          Sign Up
        </button>
      </div>

      <div className="login-card">
        <div className="left-section">
          <h2 className="login-title">LOG IN</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="emailOrPhone">Email or Phone</label>
              <input
                type="text"
                id="emailOrPhone"
                value={emailOrPhone}
                onChange={handleEmailOrPhoneChange}
                placeholder="Enter your email or phone"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>

          <div className="guest-login">
            <hr className="separator" />
            <button
              type="button"
              className="guest-button"
              onClick={handleContinueAsGuest}
            >
              Continue as Guest
            </button>
            <p className="guest-note">(Optional limited flow)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
