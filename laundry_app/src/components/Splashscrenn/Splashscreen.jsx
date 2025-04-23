import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Splashscreen.scss';

const Splashscreen = () => {


  return (
    <div className="splash-container">
      <div className="logo-wrapper">
        <div className="logo">🧺</div>
        <h1 className="brand-name">Wash-O-Matic</h1>
        <p className="tagline">We Wash, You Chill.</p>
      </div>
      <Link to="/login"><button  className='tagname'>Get started</button></Link>
    </div>
  );
};

export default Splashscreen;
