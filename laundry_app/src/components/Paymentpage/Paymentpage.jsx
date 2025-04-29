import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "./Paymentpage.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

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
      toast.error("You have already used a voucher or cashback offer!", {
        position: "top-center",
        autoClose: 3000,
      });
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
      toast.error("Invalid voucher code for the selected plan!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setDiscount(discountAmount);
    setVoucherMessage(message);
    localStorage.setItem("voucherUsed", true);
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handleRemoveVoucher = () => {
    setVoucherCode("");
    setDiscount(0);
    setVoucherMessage("");
    localStorage.removeItem("voucherUsed");
    toast.info("Voucher removed. You will be charged the full price.", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const validateExpiry = (value) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regex.test(value);
  };

  const validateCardHolderName = (value) => {
    const regex = /^[A-Za-z\s]*$/;
    return regex.test(value);
  };

  const handleExpiryChange = (e) => {
    let input = e.target.value;

    if (/^[0-9/]*$/.test(input)) {
      if (input.length === 2 && !input.includes("/")) {
        input = input + "/";
      }
      if (input.length <= 5) {
        setExpiry(input);
      }
    }

    const monthPart = input.split("/")[0];
    if (monthPart && parseInt(monthPart) > 12) {
      setExpiry(input.slice(0, -1));
    }
  };

  const handleCardHolderNameChange = (e) => {
    const value = e.target.value;

    if (/^[A-Za-z\s]*$/.test(value)) {
      setCardHolderName(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "upi" && !upiId.includes("@")) {
      toast.error("Please enter a valid UPI ID (e.g., you@bank).", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (
      (paymentMethod === "credit" || paymentMethod === "debit") &&
      !/^\d{16}$/.test(cardNumber)
    ) {
      toast.error("Card number must be exactly 16 digits.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (
      (paymentMethod === "credit" || paymentMethod === "debit") &&
      !validateExpiry(expiry)
    ) {
      toast.error("Expiry must be in MM/YY format.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (
      (paymentMethod === "credit" || paymentMethod === "debit") &&
      !validateCardHolderName(cardHolderName)
    ) {
      toast.error("Cardholder name must contain only letters and spaces.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (paymentMethod === "credit" && !/^\d{4}$/.test(cvv)) {
      toast.error("CVV must be 4 digits for credit card.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (paymentMethod === "debit" && !/^\d{3}$/.test(cvv)) {
      toast.error("CVV must be 3 digits for debit card.", {
        position: "top-center",
        autoClose: 3000,
      });
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

        {submitted && showCelebration && (
          <div className="celebration-emoji">🎉</div>
        )}

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
                placeholder="Enter Cardholder Name"
                value={cardHolderName}
                onChange={handleCardHolderNameChange}
                required
              />
              <input
                type="text"
                placeholder="Enter Card Number"
                maxLength={16}
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(e.target.value.replace(/\D/, ""))
                }
                required
              />
              <div className="row">
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={expiry}
                  onChange={handleExpiryChange}
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  maxLength={paymentMethod === "credit" ? 4 : 3}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/, ""))}
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
      </div>
    </div>
  );
};

export default PaymentPage;
