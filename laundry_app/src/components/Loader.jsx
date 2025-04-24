import React from 'react';
import './Loader.scss';

const Loader = ({ text = 'Loading your laundry...' }) => {
  return (
    <div className="laundry-loader-wrapper">
      <img
        src="/assets/images/Wash-O-Matic.png"
        alt="Laundry Loading Icon"
        className="laundry-loader-img"
      />
      <p className="laundry-loader-text">“{text}”</p>
    </div>
  );
};

export default Loader;
