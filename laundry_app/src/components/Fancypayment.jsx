import React, { useState } from "react";
import "./Fancypayment.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const FancyPage = () => {
    const navigate=useNavigate()
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState("");
  const [cardType, setCardType] = useState("credit");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upi, setUpi] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(1000);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false); // Track payment status
  const [paymentInProgress, setPaymentInProgress] = useState(false); // Track payment process state
  const [confetti, setConfetti] = useState([]); // State to hold confetti elements

  // Add confetti on payment success
  const generateConfetti = () => {
    const numConfetti = 20; // Number of confetti items
    let confettiArray = [];

    for (let i = 0; i < numConfetti; i++) {
      const confettiStyle = {
        left: `${Math.random() * 100}vw`, // Random horizontal position
        top: `${Math.random() * 100}vh`, // Random vertical position
        animationDelay: `${Math.random() * 2}s`, // Random delay for animation
      };
      confettiArray.push(confettiStyle);
    }

    setConfetti(confettiArray); 
  };

  
  const handleCardChange = (e) => {
    const val = e.target.value.replace(/\D/g, ""); 
    setCard(val);
  };

  const handleExpiryChange = (e) => {
    const val = e.target.value.replace(/\D/g, ""); 
    setExpiry(val);
  };

  const handleCvvChange = (e) => {
    const val = e.target.value.replace(/\D/g, ""); 
    setCvv(val);
  };

  
  const handleProceedToPay = () => {
  
    if (paymentInProgress) {
      toast.info("Your payment was already done!");
      navigate("/Order-tracking")
      return; 
     

    }

    setPaymentInProgress(true); 

    
    if (method === "card") {
      if (!card || !expiry || !cvv) {
        toast.error("Please fill all the card details.");
        setPaymentInProgress(false); 
        return;
      }
    } else if (method === "upi") {
      if (!upi) {
        toast.error("Please enter your UPI ID.");
        setPaymentInProgress(false); 
        return;
      }
    }

    
    toast.success("Your payment was successful 😍");
    setPaymentSuccessful(true); 
    generateConfetti(); 
  };

  
  const handleGoToOrders = () => {
    navigate("/Order-tracking")
    
  };

  return (
    <div className="fancy-payment-bg">
      <div className="fancy-container">
        <h2>🛅 Secure Payment</h2>

        <div className="tab-buttons">
          <button
            className={method === "card" ? "active" : ""}
            onClick={() => setMethod("card")}
          >
            Card
          </button>
          <button
            className={method === "upi" ? "active" : ""}
            onClick={() => setMethod("upi")}
          >
            UPI
          </button>
        </div>

        {method === "card" && (
          <div className="form-section">
            <div className="card-options">
              <button
                className={cardType === "credit" ? "active" : ""}
                onClick={() => setCardType("credit")}
              >
                Credit Card
              </button>
              <button
                className={cardType === "debit" ? "active" : ""}
                onClick={() => setCardType("debit")}
              >
                Debit Card
              </button>
            </div>

            <input
              type="text"
              placeholder="Card Number"
              value={card}
              maxLength="16"
              onChange={handleCardChange}
            />
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              maxLength="5"
              onChange={handleExpiryChange}
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              maxLength="3"
              onChange={handleCvvChange}
            />
          </div>
        )}

        {method === "upi" && (
          <div className="form-section">
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
            />
          </div>
        )}

       
        <div className="coupon-section">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button onClick={() => handleProceedToPay()}>Apply Coupon</button>
        </div>

        <div className="total-amount">
          <h3>Total Amount: ${total}</h3>
          {discount > 0 && <p>Discount Applied: ${discount}</p>}
        </div>

        
        <button
          className="pay"
          onClick={handleProceedToPay}
          disabled={paymentInProgress} 
        >
          Proceed To Pay
        </button>

        {paymentSuccessful && (
          <button className="go-to-orders" onClick={handleGoToOrders}>
            Go to Orders
          </button>
        )}
      </div>

   
      {confetti.length > 0 && (
        <div className="confetti-container">
          {confetti.map((style, index) => (
            <div key={index} className="confetti" style={style}>
              🎉
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default FancyPage;
