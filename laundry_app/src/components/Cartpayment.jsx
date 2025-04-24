import React, { useState, useContext } from "react";
import "./Cartpayment.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCreditCard } from "react-icons/fa";
import {
  MdCreditCard,
  MdOutlineQrCodeScanner,
  MdCheckCircle,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

const CartPayment = () => {
  const { total } = useContext(CartContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    if (
      (selectedOption === "upi" && !upiId) ||
      ((selectedOption === "debit" || selectedOption === "credit") &&
        (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv))
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Your payment was successful!");
    setPaymentSuccess(true);
  };

  const handleScheduleRedirect = () => {
    if (!paymentSuccess) {
      toast.error("Please complete your payment before scheduling.");
      return;
    }
    navigate("/OrderTracking");
  };

  return (
    <div className="payment1">
      <h2>Select Payment Method</h2>

      <div className="payment2">
        <div
          className={`option1 ${selectedOption === "upi" ? "selected" : ""}`}
          onClick={() => setSelectedOption("upi")}
        >
          <MdOutlineQrCodeScanner size={30} color="#673AB7" />
          <span>UPI</span>
        </div>
        <div
          className={`option1 ${selectedOption === "debit" ? "selected" : ""}`}
          onClick={() => setSelectedOption("debit")}
        >
          <MdCreditCard size={30} color="#3F51B5" />
          <span>Debit Card</span>
        </div>
        <div
          className={`option1 ${selectedOption === "credit" ? "selected" : ""}`}
          onClick={() => setSelectedOption("credit")}
        >
          <FaCreditCard size={30} color="#009688" />
          <span>Credit Card</span>
        </div>
      </div>

      <div className="payment3">
        {selectedOption === "upi" && (
          <>
            <label>Enter UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
            />
          </>
        )}

        {(selectedOption === "debit" || selectedOption === "credit") && (
          <>
            <label>Card Number</label>
            <input
              type="text"
              maxLength={16}
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
            />
            <label>Expiry Date</label>
            <input
              type="text"
              maxLength={5}
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, expiry: e.target.value })
              }
            />
            <label>CVV</label>
            <input
              type="password"
              maxLength={3}
              placeholder="123"
              value={cardDetails.cvv}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cvv: e.target.value })
              }
            />
          </>
        )}

        {selectedOption && (
          <button className="button-1" onClick={handlePayment}>
            Proceed with Payment
          </button>
        )}

        {paymentSuccess && (
          <div className="payment-success-section">
            <div className="party-emoji bounce">🎉</div>
            <MdCheckCircle size={60} color="green" className="success-icon" />
            <p className="success-text">Payment Successful!</p>
            <div className="delayed-schedule">
              <Link to="/Order-tracking">
                <button
                  className="schedule-btn"
                  onClick={handleScheduleRedirect}
                >
                  Confirm Schedule
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {total ? (
        <div className="total-amount">
          <h3>Total: ₹{total}</h3>
        </div>
      ) : (
        <p>Total not found. Please go back to cart.</p>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default CartPayment;
