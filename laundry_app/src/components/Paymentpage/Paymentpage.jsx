import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Paymentpage.scss";

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
  const [showAlert, setShowAlert] = useState(false); // state to control alert visibility

  const navigate = useNavigate();

  const selectedPlan = localStorage.getItem("selectedPlan");
  const originalPrice = {
    "1 Month": 699,
    "3 Months": 1799,
    "12 Months": 6999,
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

    if (voucherCode === "CASHBACK100" && selectedPlan === "1 Month") {
      discountAmount = 100;
      message = "🎁 You've received a Cashback Voucher worth ₹100!";
    } else if (
      voucherCode === "FOODVOUCHER200" &&
      selectedPlan === "3 Months"
    ) {
      discountAmount = 200;
      message = "🍽️ You've unlocked Free Food Vouchers from Zomato & Swiggy!";
    } else if (voucherCode === "GOATRIP500" && selectedPlan === "12 Months") {
      discountAmount = 500;
      message = "🏖️ Pack your bags! You’ve earned a Free Goa Trip Voucher 🎉";
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

    if (
      (paymentMethod === "credit" || paymentMethod === "debit") &&
      cardNumber.length !== 16
    ) {
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
    setTimeout(() => {
      setAlertMessage("Payment Successful! 🎉");
      setAlertType("success");
      setShowAlert(true);
      navigate("/");
    }, 1500);
  };

  const finalPrice = originalPrice[selectedPlan] - discount;

  return (
    <div className="payment-page">
      <h2>Choose Payment Method</h2>

      <div className="payment-methods">
        <div
          className={paymentMethod === "credit" ? "active" : ""}
          onClick={() => setPaymentMethod("credit")}
        >
          Credit Card
        </div>
        <div
          className={paymentMethod === "debit" ? "active" : ""}
          onClick={() => setPaymentMethod("debit")}
        >
          Debit Card
        </div>
        <div
          className={paymentMethod === "upi" ? "active" : ""}
          onClick={() => setPaymentMethod("upi")}
        >
          UPI / GPay / PayTM
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        {(paymentMethod === "credit" || paymentMethod === "debit") && (
          <>
            <input
              type="text"
              placeholder="Enter Card Number"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <input type="text" placeholder="Cardholder Name" required />
            <div className="row">
              <input type="text" placeholder="MM/YY" maxLength={5} required />
              <input
                type="password"
                placeholder="CVV"
                maxLength={3}
                required
              />
            </div>
          </>
        )}

        {paymentMethod === "upi" && (
          <input
            type="text"
            placeholder="Enter UPI ID (e.g. you@bank)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required
          />
        )}

        <div className="voucher-section">
          <input
            type="text"
            placeholder="Enter Voucher Code"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <button type="button" onClick={handleVoucherApply}>
            Apply Voucher
          </button>
          {voucherCode && (
            <button type="button" onClick={handleRemoveVoucher}>
              Remove Voucher
            </button>
          )}
        </div>

        {voucherMessage && (
          <div className="voucher-message">
            <p>{voucherMessage}</p>
          </div>
        )}

        <div className="final-price">
          <p>Original Price: ₹{originalPrice[selectedPlan]}</p>
          <p>Discount: ₹{discount}</p>
          <p className="price">Final Price: ₹{finalPrice}</p>
        </div>

        <button type="submit">Make Payment</button>

        {submitted && (
          <div className="voucher-box success">
            Payment Successful!
            <p>{voucherMessage}</p>
          </div>
        )}
      </form>

      {/* Custom Alert Box */}
      {showAlert && (
        <div className={`custom-alert ${alertType}`}>
          <div className="alert-content">
            <p>{alertMessage}</p>
            <button onClick={() => setShowAlert(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
