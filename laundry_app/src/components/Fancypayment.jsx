// import React, { useState, useEffect } from "react";
// import "./Fancypayment.scss";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import Loader from "./Loader";

// const FancyPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const passedTotal =
//     location.state && typeof location.state.total === "number"
//       ? location.state.total
//       : 0;

//   const [loading, setLoading] = useState(true);
//   const [total, setTotal] = useState(passedTotal);
//   const [method, setMethod] = useState("card");
//   const [card, setCard] = useState("");
//   const [cardType, setCardType] = useState("credit");
//   const [expiry, setExpiry] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [upi, setUpi] = useState("");
//   const [coupon, setCoupon] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [paymentSuccessful, setPaymentSuccessful] = useState(false);
//   const [paymentInProgress, setPaymentInProgress] = useState(false);
//   const [confetti, setConfetti] = useState([]);

//   const couponCodes = {
//     DISCOUNT10: 10,
//     SAVE90: 90,
//     FRAGNANCE30: 30,
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const generateConfetti = () => {
//     const numConfetti = 20;
//     let confettiArray = [];

//     for (let i = 0; i < numConfetti; i++) {
//       const confettiStyle = {
//         left: `${Math.random() * 100}vw`,
//         top: `${Math.random() * 100}vh`,
//         animationDelay: `${Math.random() * 2}s`,
//       };
//       confettiArray.push(confettiStyle);
//     }

//     setConfetti(confettiArray);
//   };

//   const handleCardChange = (e) => {
//     const val = e.target.value.replace(/\D/g, "");
//     setCard(val);
//   };

//   const handleExpiryChange = (e) => {
//     let input = e.target.value.replace(/\D/g, "");

//     if (input.length > 4) {
//       input = input.slice(0, 4);
//     }

//     let formatted = input;
//     if (input.length >= 3) {
//       formatted = `${input.slice(0, 2)}/${input.slice(2)}`;
//     }

    
//     const mm = parseInt(formatted.slice(0, 2), 10);
//     if (formatted.length >= 2 && (mm < 1 || mm > 12)) {
//       toast.error("Invalid month. Use MM/YY format (e.g., 04/26).");
//       return;
//     }

//     setExpiry(formatted);
//   };

//   const handleCvvChange = (e) => {
//     const val = e.target.value.replace(/\D/g, "");
//     setCvv(val);
//   };

//   const handleCouponApply = () => {
//     const discountPercentage = couponCodes[coupon.toUpperCase()];

//     if (discountPercentage) {
//       const discountAmount = (total * discountPercentage) / 100;
//       setDiscount(discountAmount);
//       setTotal(total - discountAmount);
//       toast.success(`Coupon applied! You saved ₹${discountAmount}`);
//     } else {
//       toast.error("Invalid coupon code.");
//     }
//   };

//   const handleUpiChange = (e) => {
//     setUpi(e.target.value);
//   };

//   const handleProceedToPay = () => {
//     if (paymentInProgress) {
//       toast.info("Your payment was already done!");
//       navigate("/fancypage");
//       return;
//     }

//     setPaymentInProgress(true);

//     if (method === "card") {
//       if (!card || !expiry || !cvv) {
//         toast.error("Please fill all the card details.");
//         setPaymentInProgress(false);
//         return;
//       }

//       if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
//         toast.error("Invalid expiry format. Use MM/YY.");
//         setPaymentInProgress(false);
//         return;
//       }
//     } else if (method === "upi") {
//       if (!upi || !upi.includes("@")) {
//         toast.error("Please enter UPI ID correctly (e.g., abc@xyz).");
//         setPaymentInProgress(false);
//         return;
//       }
//     }

//     setTimeout(() => {
//       toast.success("Your payment was successful 😍");
//       setPaymentSuccessful(true);
//       setPaymentInProgress(false);
//       generateConfetti();
//     }, 1500);
//   };

//   const handleGoToPickup = () => {
//     navigate("/Pickup");
//   };

//   if (loading) {
//     return <Loader text="Preparing secure payment portal..." />;
//   }

//   return (
//     <div className="fancy-payment-bg">
//       <div className="fancy-container">
//         <h2>🛅 Secure Payment</h2>

//         <div className="tab-buttons">
//           <button
//             className={method === "card" ? "active" : ""}
//             onClick={() => setMethod("card")}
//           >
//             Card
//           </button>
//           <button
//             className={method === "upi" ? "active" : ""}
//             onClick={() => setMethod("upi")}
//           >
//             UPI
//           </button>
//         </div>

//         {method === "card" && (
//           <div className="form-section">
//             <div className="card-options">
//               <button
//                 className={cardType === "credit" ? "active" : ""}
//                 onClick={() => setCardType("credit")}
//               >
//                 Credit Card
//               </button>
//               <button
//                 className={cardType === "debit" ? "active" : ""}
//                 onClick={() => setCardType("debit")}
//               >
//                 Debit Card
//               </button>
//             </div>
//             <input
//               type="text"
//               placeholder="Card Number"
//               value={card}
//               maxLength="16"
//               onChange={handleCardChange}
//             />
//             <input
//               type="text"
//               placeholder="MM/YY"
//               value={expiry}
//               maxLength="5"
//               onChange={handleExpiryChange}
//             />
//             <input
//               type="text"
//               placeholder="CVV"
//               value={cvv}
//               maxLength="3"
//               onChange={handleCvvChange}
//             />
//           </div>
//         )}

//         {method === "upi" && (
//           <div className="form-section">
//             <input
//               type="text"
//               placeholder="Enter UPI ID (e.g., abc@xyz)"
//               value={upi}
//               onChange={handleUpiChange}
//             />
//           </div>
//         )}

//         <div className="coupon-section">
//           <input
//             type="text"
//             placeholder="Enter Coupon Code"
//             value={coupon}
//             onChange={(e) => setCoupon(e.target.value)}
//           />
//           <button onClick={handleCouponApply}>Apply Coupon</button>
//         </div>

//         <div className="total-amount">
//           <h3>Total Amount: ₹{total}</h3>
//           {discount > 0 && <p>Discount Applied: ₹{discount}</p>}
//         </div>

//         <button
//           className="pay"
//           onClick={handleProceedToPay}
//           disabled={paymentInProgress || paymentSuccessful}
//         >
//           {paymentInProgress ? "Processing..." : "Proceed To Pay"}
//         </button>

//         {paymentSuccessful && (
//           <>
//             <button className="go-to-Pickup" onClick={handleGoToPickup}>
//               Proceed To Schedule
//             </button>
//           </>
//         )}
//       </div>

//       {confetti.length > 0 && (
//         <div className="confetti-container">
//           {confetti.map((style, index) => (
//             <div key={index} className="confetti" style={style}>
//               🎉
//             </div>
//           ))}
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default FancyPage;

import React, { useState, useEffect } from "react";
import "./Fancypayment.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "./Loader";

const FancyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const passedTotal =
    location.state && typeof location.state.total === "number"
      ? location.state.total
      : 0;

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(passedTotal);
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState("");
  const [cardType, setCardType] = useState("credit");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upi, setUpi] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const couponCodes = {
    DISCOUNT10: 10,
    SAVE90: 90,
    FRAGNANCE30: 30,
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const generateConfetti = () => {
    const numConfetti = 20;
    let confettiArray = [];

    for (let i = 0; i < numConfetti; i++) {
      const confettiStyle = {
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        animationDelay: `${Math.random() * 2}s`,
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
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 4) {
      input = input.slice(0, 4);
    }

    let formatted = input;
    if (input.length >= 3) {
      formatted = `${input.slice(0, 2)}/${input.slice(2)}`;
    }

    const mm = parseInt(formatted.slice(0, 2), 10);
    if (formatted.length >= 2 && (mm < 1 || mm > 12)) {
      toast.error("Invalid month. Use MM/YY format (e.g., 04/26).");
      return;
    }

    setExpiry(formatted);
  };

  const handleCvvChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    setCvv(val);
  };

  const handleCouponApply = () => {
    const discountPercentage = couponCodes[coupon.toUpperCase()];

    if (discountPercentage) {
      const discountAmount = (total * discountPercentage) / 100;
      setDiscount(discountAmount);
      setTotal(total - discountAmount);
      toast.success(`Coupon applied! You saved ₹${discountAmount}`);
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const handleUpiChange = (e) => {
    setUpi(e.target.value);
  };

  const handleProceedToPay = () => {
    if (paymentInProgress) {
      toast.info("Your payment was already done!");
      navigate("/fancypage");
      return;
    }

    setPaymentInProgress(true);

    if (method === "card") {
      if (!card || !expiry || !cvv) {
        toast.error("Please fill all the card details.");
        setPaymentInProgress(false);
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        toast.error("Invalid expiry format. Use MM/YY.");
        setPaymentInProgress(false);
        return;
      }
    } else if (method === "upi") {
      if (!upi || !upi.includes("@")) {
        toast.error("Please enter UPI ID correctly (e.g., abc@xyz).");
        setPaymentInProgress(false);
        return;
      }
    }

    setTimeout(() => {
      toast.success("Your payment was successful 😍");
      setPaymentSuccessful(true);
      setPaymentInProgress(false);
      generateConfetti();
    }, 1500);
  };

  const handleGoToPickup = () => {
    navigate("/Pickup");
  };

  if (loading) {
    return <Loader text="Preparing secure payment portal..." />;
  }

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
              placeholder="Enter UPI ID (e.g., abc@xyz)"
              value={upi}
              onChange={handleUpiChange}
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
          <button onClick={handleCouponApply}>Apply Coupon</button>
        </div>

        <div className="total-amount">
          <h3>Total Amount: ₹{total}</h3>
          {discount > 0 && <p>Discount Applied: ₹{discount}</p>}
        </div>

        <button
          className="pay"
          onClick={handleProceedToPay}
          disabled={paymentInProgress || paymentSuccessful}
        >
          {paymentInProgress ? "Processing..." : "Proceed To Pay"}
        </button>

        {paymentSuccessful && (
          <>
            <button className="go-to-Pickup" onClick={handleGoToPickup}>
              Proceed To Schedule
            </button>
          </>
        )}
      </div>

      {confetti.length > 0 && (
        <div className="confetti-container">
          {confetti.map((style, index) => (
            <div key={index} className="confetti" style={style}>
              {/* 🎉 icon removed */}
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default FancyPage;

