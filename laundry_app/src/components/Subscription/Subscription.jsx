import React from "react";
import { FaTags } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Subscription.scss";
import Navbar from "../NavBar";

const Subscriptions = () => {
  const plans = [
    {
      name: "Premium",
      duration: "1 Month",
      price: "₹699",
      pickupsPerWeek: "3 Pickups/Week",
      features: ["3 pickups & deliveries/week", "Monthly Cashback", "Guaranteed Slot"],
      buttonText: "BUY NOW",
    },
    {
      name: "Premium",
      duration: "3 Months",
      price: "₹1799",
      pickupsPerWeek: "5 Pickups/Week",
      features: ["Up to 5 pickups & deliveries/week", "Food Vouchers", "Guaranteed Slot"],
      buttonText: "BUY NOW",
    },
    {
      name: "Premium",
      duration: "12 Months",
      price: "₹6999",
      pickupsPerWeek: "6 Pickups/Week",
      features: ["6 pickups & deliveries/week", "Goa free trip", "Priority Slot"],
      buttonText: "BUY NOW",
    },
  ];

  const navigate = useNavigate();

  const handleBuyNow = (duration) => {
    localStorage.setItem("selectedPlan", duration);
    navigate("/payment");
  };

  return (
    <div>
      <Navbar/>
    <div className="subscriptions-page" >
      <h2>
        <FaTags style={{ marginRight: "10px", color: "#4355f5" }} />
        Choose Your Plan
      </h2>
      <div className="plans-container">
        {plans.map((plan, index) => (
          <div className="plan-card" key={index}>
            <h3>clubultimate {plan.name.toLowerCase()}<sup>z++</sup></h3>
            <div className="duration">{plan.duration}</div>
            <div className="price">{plan.price}</div>
            <div className="pickups">{plan.pickupsPerWeek}</div>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button
              className="buy-button"
              onClick={() => handleBuyNow(plan.duration)}
            > 
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Subscriptions;
