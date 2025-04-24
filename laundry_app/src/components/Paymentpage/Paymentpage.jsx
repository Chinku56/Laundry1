// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "./Paymentpage.scss";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PaymentPage = () => {
//   const [paymentMethod, setPaymentMethod] = useState("credit");
//   const [cardNumber, setCardNumber] = useState("");
//   const [upiId, setUpiId] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [voucherCode, setVoucherCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [voucherMessage, setVoucherMessage] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState("success");
//   const [showAlert, setShowAlert] = useState(false);
//   const [showCelebration, setShowCelebration] = useState(false);

//   const navigate = useNavigate();
//   const selectedPlan = localStorage.getItem("selectedPlan");
//   const originalPrice = {
//     "1 Month": 699,
//     "3 Months": 1799,
//     "12 Months": 6999,
//   };

//   const handleVoucherApply = () => {
//     const userVoucherUsed = localStorage.getItem("voucherUsed");

//     if (userVoucherUsed) {
//       setAlertMessage("You have already used a voucher or cashback offer!");
//       setAlertType("error");
//       setShowAlert(true);
//       return;
//     }

//     let discountAmount = 0;
//     let message = "";

//     if (voucherCode === "CASHBACK100" && selectedPlan === "1 Month") {
//       discountAmount = 100;
//       message = "🎁 You've received a Cashback Voucher worth ₹100!";
//     } else if (
//       voucherCode === "FOODVOUCHER200" &&
//       selectedPlan === "3 Months"
//     ) {
//       discountAmount = 200;
//       message = "🍽️ You've unlocked Free Food Vouchers from Zomato & Swiggy!";
//     } else if (voucherCode === "GOATRIP500" && selectedPlan === "12 Months") {
//       discountAmount = 500;
//       message = "🏖️ Pack your bags! You’ve earned a Free Goa Trip Voucher 🎉";
//     } else {
//       setAlertMessage("Invalid voucher code for the selected plan!");
//       setAlertType("error");
//       setShowAlert(true);
//       return;
//     }

//     setDiscount(discountAmount);
//     setVoucherMessage(message);
//     localStorage.setItem("voucherUsed", true);
//   };

//   const handleRemoveVoucher = () => {
//     setVoucherCode("");
//     setDiscount(0);
//     setVoucherMessage("");
//     localStorage.removeItem("voucherUsed");
//     setAlertMessage("Voucher removed. You will be charged the full price.");
//     setAlertType("info");
//     setShowAlert(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       (paymentMethod === "credit" || paymentMethod === "debit") &&
//       cardNumber.length !== 16
//     ) {
//       setAlertMessage("Card number must be 16 digits.");
//       setAlertType("error");
//       setShowAlert(true);
//       return;
//     }

//     if (paymentMethod === "upi" && !upiId.includes("@")) {
//       setAlertMessage("Enter a valid UPI ID.");
//       setAlertType("error");
//       setShowAlert(true);
//       return;
//     }

//     setSubmitted(true);
//     setShowCelebration(true);
//     toast.success("Payment Successful! 🎉", {
//       position: "top-center",
//       autoClose: 2000,
//     });

//     setTimeout(() => {
//       navigate("/home");
//     }, 2500);
//   };

//   const finalPrice = originalPrice[selectedPlan] - discount;

//   return (
//     <div className="chinna">
//       <div className="payment-page">
//         <ToastContainer />

//         <h2>Choose Payment Method</h2>

//         {submitted && showCelebration && (
//           <div className="celebration-emoji">🎉</div>
//         )}

//         <div className="payment-methods">
//           <div
//             className={paymentMethod === "credit" ? "active" : ""}
//             onClick={() => setPaymentMethod("credit")}
//           >
//             Credit Card
//           </div>
//           <div
//             className={paymentMethod === "debit" ? "active" : ""}
//             onClick={() => setPaymentMethod("debit")}
//           >
//             Debit Card
//           </div>
//           <div
//             className={paymentMethod === "upi" ? "active" : ""}
//             onClick={() => setPaymentMethod("upi")}
//           >
//             UPI / GPay / PayTM
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="payment-form">
//           {(paymentMethod === "credit" || paymentMethod === "debit") && (
//             <>
//               <input
//                 type="text"
//                 placeholder="Enter Card Number"
//                 maxLength={16}
//                 value={cardNumber}
//                 onChange={(e) => setCardNumber(e.target.value)}
//                 required
//               />
//               <input type="text" placeholder="Cardholder Name" required />
//               <div className="row">
//                 <input type="text" placeholder="MM/YY" maxLength={5} required />
//                 <input
//                   type="password"
//                   placeholder="CVV"
//                   maxLength={3}
//                   required
//                 />
//               </div>
//             </>
//           )}

//           {paymentMethod === "upi" && (
//             <input
//               type="text"
//               placeholder="Enter UPI ID (e.g. you@bank)"
//               value={upiId}
//               onChange={(e) => setUpiId(e.target.value)}
//               required
//             />
//           )}

//           <div className="voucher-section">
//             <input
//               type="text"
//               placeholder="Enter Voucher Code"
//               value={voucherCode}
//               onChange={(e) => setVoucherCode(e.target.value)}
//             />
//             <button type="button" onClick={handleVoucherApply}>
//               Apply Voucher
//             </button>
//             {voucherCode && (
//               <button type="button" onClick={handleRemoveVoucher}>
//                 Remove Voucher
//               </button>
//             )}
//           </div>

//           {voucherMessage && (
//             <div className="voucher-message">
//               <p>{voucherMessage}</p>
//             </div>
//           )}

//           <div className="final-price">
//             <p>Original Price: ₹{originalPrice[selectedPlan]}</p>
//             <p>Discount: ₹{discount}</p>
//             <p className="price">Final Price: ₹{finalPrice}</p>
//           </div>

//           <button type="submit">Make Payment</button>

//           {submitted && (
//             <div className="voucher-box success">
//               Payment Successful!
//               <p>{voucherMessage}</p>
//             </div>
//           )}
//         </form>

//         {showAlert && (
//           <div className={`custom-alert ${alertType}`}>
//             <div className="alert-content">
//               <p>{alertMessage}</p>
//               <button onClick={() => setShowAlert(false)}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Paymentpage.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [showAlert, setShowAlert] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const navigate = useNavigate();
  const selectedPlan = localStorage.getItem("selectedPlan");
  const originalPrice = {
    "Basic Wash": 199,
    "Monthly Plan": 999,
    "Family Pack": 1999,
  };

  const handleVoucherApply = () => {
    const userVoucherUsed = localStorage.getItem("voucherUsed");

    if (userVoucherUsed) {
      setAlertMessage("You have already used a voucher or cashback offer!");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    let discountAmount = 0;
    let message = "";

    if (voucherCode === "FREESHIP" && selectedPlan === "Basic Wash") {
      discountAmount = 50;
      message = "🚚 Free Pickup & Delivery for your Basic Wash!";
    } else if (voucherCode === "DETERGENT100" && selectedPlan === "Monthly Plan") {
      discountAmount = 100;
      message = "🧴 You’ve unlocked a free detergent pack worth ₹100!";
    } else if (voucherCode === "FAMILYCLEAN300" && selectedPlan === "Family Pack") {
      discountAmount = 300;
      message = "👨‍👩‍👧‍👦 3 Family Loads Cleaned for Free!";
    } else {
      setAlertMessage("Invalid voucher code for the selected plan!");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    setDiscount(discountAmount);
    setVoucherMessage(message);
    localStorage.setItem("voucherUsed", true);
  };

  const handleRemoveVoucher = () => {
    setVoucherCode("");
    setDiscount(0);
    setVoucherMessage("");
    localStorage.removeItem("voucherUsed");
    setAlertMessage("Voucher removed. You will be charged the full price.");
    setAlertType("info");
    setShowAlert(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((paymentMethod === "credit" || paymentMethod === "debit") && cardNumber.length !== 16) {
      setAlertMessage("Card number must be 16 digits.");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    if (paymentMethod === "upi" && !upiId.includes("@")) {
      setAlertMessage("Enter a valid UPI ID.");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    setSubmitted(true);
    setShowCelebration(true);
    toast.success("Payment Successful! 🎉", {
      position: "top-center",
      autoClose: 2000,
    });

    setTimeout(() => {
      navigate("/home");
    }, 2500);
  };

  const finalPrice = originalPrice[selectedPlan] - discount;

  return (
    <div className="chinna">
      <div className="payment-page">
        <ToastContainer />
        <h2>Choose Payment Method</h2>

        {submitted && showCelebration && <div className="celebration-emoji">🎉</div>}

        <div className="payment-methods">
          <div className={paymentMethod === "credit" ? "active" : ""} onClick={() => setPaymentMethod("credit")}>Credit Card</div>
          <div className={paymentMethod === "debit" ? "active" : ""} onClick={() => setPaymentMethod("debit")}>Debit Card</div>
          <div className={paymentMethod === "upi" ? "active" : ""} onClick={() => setPaymentMethod("upi")}>UPI / GPay / PayTM</div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          {(paymentMethod === "credit" || paymentMethod === "debit") && (
            <>
              <input type="text" placeholder="Enter Card Number" maxLength={16} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
              <input type="text" placeholder="Cardholder Name" required />
              <div className="row">
                <input type="text" placeholder="MM/YY" maxLength={5} required />
                <input type="password" placeholder="CVV" maxLength={3} required />
              </div>
            </>
          )}

          {paymentMethod === "upi" && (
            <input type="text" placeholder="Enter UPI ID (e.g. you@bank)" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
          )}

          <div className="voucher-section">
            <input type="text" placeholder="Enter Voucher Code" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} />
            <button type="button" onClick={handleVoucherApply}>Apply Voucher</button>
            {voucherCode && <button type="button" className="remove" onClick={handleRemoveVoucher}>Remove Voucher</button>}
          </div>

          {voucherMessage && <div className="voucher-message"><p>{voucherMessage}</p></div>}

          <div className="final-price">
            <p><strong>Plan:</strong> {selectedPlan}</p>
            <p><strong>Original Price:</strong> ₹{originalPrice[selectedPlan]}</p>
            <p><strong>Discount:</strong> ₹{discount}</p>
            <hr />
            <p className="price"><strong>Total Payable:</strong> ₹{finalPrice}</p>
          </div>

          <button type="submit">Make Payment</button>

          {submitted && (
            <div className="voucher-box success">
              Payment Successful!
              <p>{voucherMessage}</p>
            </div>
          )}
        </form>

        {showAlert && (
          <div className={`custom-alert ${alertType}`}>
            <div className="alert-content">
              <p>{alertMessage}</p>
              <button onClick={() => setShowAlert(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
