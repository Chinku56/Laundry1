import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Splashscreen.scss';

const SplashScreen = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const isLoggedIn = localStorage.getItem('isLoggedIn');
  //     if (isLoggedIn) {
  //       navigate('/dashboard');
  //     } else {
  //       navigate('/login');
  //     }
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="splash-container">
      <div className="logo-wrapper">
        <div className="logo">🧺</div>
        <h1 className="brand-name">Wash-O-Matic</h1>
      </div>
      <button className='tagname'>Get started</button>
    </div>
  );
};

export default SplashScreen;
