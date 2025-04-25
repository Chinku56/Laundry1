import React, { useState, useEffect } from "react";
import "./Promotional.scss";
import Loader from "./Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Promotional = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <Loader text="I wish my bank account refilled as fast as my laundry basket..." />
      ) : (
        <div className="promo-section">
          <div className="banner banner-one">
            <div className="content">
              <h1>WASH-O-MATIC</h1>
              <h2>LAUNDRY SERVICE</h2>
              <p>Breathe new life into laundry 😂, Wash away your worries 💕</p>
              <p>Fresh, clean clothes delivered to your door. Try us today!</p>
              <a href="/home" className="read-more">
                Enjoy Go To Home 😍
              </a>
            </div>
          </div>

          <div className="banner banner-two">
            <div className="content">
              <h1>WASH-O-MATIC</h1>
              <h2>SUPER WASH LAUNDRY</h2>
              <p>
                Get 50% off your first order! Fast, affordable, and spotless
                results.
              </p>
              <div className="offer">50% OFF FOR FIRST ORDER</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotional;
