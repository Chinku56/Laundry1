import React, { useState, useEffect } from "react";
import "./Promotional.scss";
import Loader from "./Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Offers from "./Offers/Offers";
import Navbar from "./NavBar";

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
        <>
        <Navbar/>
        <Offers/>
          
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
        </div>
        </>
      )}
    
    </div>
  );
};

export default Promotional;
