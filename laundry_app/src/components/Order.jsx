import React, { useEffect, useState, useContext } from "react";
import { usePickup } from "./PickupContext";
import "./Orderstatus.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../components/CartContext";
import Loader from "./Loader";

const steps = [
  { label: "Order Placed", icon: "📝" },
  { label: "Picked Up", icon: "📦" },
  { label: "In Laundry", icon: "🧺" },
  { label: "Out for Delivery", icon: "🚚" },
  { label: "Completed", icon: "✅" },
];

const OrderTracking = () => {
  const { pickupDetails, selectedAgent } = usePickup();
  const [currentStep, setCurrentStep] = useState(0);
  const [showIcon, setShowIcon] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date) ? dateStr : date.toLocaleDateString();
  };

  const showToast = () => {
    toast.success("Your laundry order has been completed. Thank you!");
    setShowIcon(true);
    setTimeout(() => setShowIcon(false), 3000);
  };

  useEffect(() => {
    if (currentStep === steps.length - 1) {
      showToast();
    }
  }, [currentStep]);

  const handleBack = () => {
    clearCart();
    navigate("/home");
  };

  if (loading) return <Loader text="Tracking your fresh clothes journey..." />;

  return (
    <div
      className="order-tracking"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <button className="Back" onClick={handleBack}>
        Back To Home
      </button>
      <h2 style={{ textAlign: "center", color: "#303f9f", marginTop: "95px" }}>
        Order Tracking
      </h2>

      {pickupDetails ? (
        <div className="order-details" style={styles.details}>
          <p>
            <strong>Pickup:</strong> {formatDate(pickupDetails.pickupDate)}
          </p>
          <p>
            <strong>Drop-off:</strong> {formatDate(pickupDetails.dropoffDate)}
          </p>
          <p>
            <strong>Slot:</strong> {pickupDetails.timeSlot}
          </p>
          <p>
            <strong>Express:</strong> {pickupDetails.isExpress ? "Yes" : "No"}
          </p>
          <p>
            <strong>Agent:</strong> {selectedAgent || "N/A"}
          </p>
          <p>
            <strong>Fragrance:</strong> {pickupDetails.fragrance || "N/A"}
          </p>
        </div>
      ) : (
        <p style={{ fontSize: "18px", textAlign: "center", color: "#888" }}>
          No order details found.
        </p>
      )}

      <div className="timeline-wrapper" style={{ overflowX: "auto" }}>
        <div className="timeline" style={styles.timeline}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div
                className={`timeline-step ${
                  index < currentStep ? "completed" : ""
                } ${index === currentStep ? "active" : ""}`}
                style={styles.step}
              >
                <div
                  className="step-icon"
                  style={{
                    ...styles.iconCircle,
                    backgroundColor:
                      index < currentStep
                        ? "#28a745"
                        : index === currentStep
                        ? "#007bff"
                        : "#ccc",
                  }}
                >
                  {step.icon}
                </div>
                <div className="step-label" style={styles.label}>
                  {step.label}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`connector-line ${
                    index < currentStep ? "completed" : ""
                  }`}
                  style={{
                    flex: 1,
                    height: "4px",
                    backgroundColor: index < currentStep ? "#28a745" : "#ccc",
                    margin: "0 10px",
                    zIndex: 1,
                    position: "relative",
                    top: "-15px",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {showIcon && (
        <div className="celebration-icon" style={styles.confetti}>
          🎉
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

const styles = {
  iconCircle: {
    color: "white",
    fontSize: "32px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  },
  step: {
    textAlign: "center",
    position: "relative",
  },
  label: {
    fontSize: "16px",
    fontWeight: "500",
  },
  timeline: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "0 auto",
    maxWidth: "1000px",
  },
  details: {
    backgroundColor: "#fbd000",
    width: "30%",
    padding: "40px",
    marginLeft: "35%",
    textAlign: "start",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
  },
  confetti: {
    position: "fixed",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "80px",
    animation: "bounce 1s infinite",
    zIndex: 1000,
  },
};

export default OrderTracking;
