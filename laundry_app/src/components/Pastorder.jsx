import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Pastorder.scss";
import Loader from "./Loader";

const dummyOrders = [
  {
    id: "ORD12345",
    date: "2025-04-15",
    items: ["3 Shirts", "2 Pants", "1 Jacket"],
    serviceType: "Wash & Fold",
    status: "Delivered",
    total: "615/-",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD12346",
    date: "2025-04-10",
    items: ["2 Towels", "1 Blanket"],
    serviceType: "Dry Cleaning",
    status: "Out for Delivery",
    total: "420/-",
    paymentMethod: "Google Pay",
  },
  {
    id: "ORD12347",
    date: "2025-03-30",
    items: ["5 Shirts"],
    serviceType: "Ironing",
    status: "Delivered",
    total: "300/-",
    paymentMethod: "Debit Card",
  },
];

const Pastorder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigate("/Accountpage");
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="service-history-page">
      {loading ? (
        <Loader text="There is no such thing as a dull life; only ones that are full of laundry..." />
      ) : (
        <>
          <button className="Back3" onClick={handleBack}>
            ← Back
          </button>
          <h2>🧺 My Laundry Orders</h2>
          <p>Here's a quick look at your recent services.</p>
          <div className="grid">
            {dummyOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="card-header">
                  <h3>
                    Order <span>#{order.id}</span>
                  </h3>
                  <span
                    className={`status ${order.status
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {order.status}
                  </span>
                </div>
                <ul>
                  <li>
                    <strong>Date:</strong> {order.date}
                  </li>
                  <li>
                    <strong>Service:</strong> {order.serviceType}
                  </li>
                  <li>
                    <strong>Items:</strong> {order.items.join(", ")}
                  </li>
                  <li>
                    <strong>Total:</strong> {order.total}
                  </li>
                  <li>
                    <strong>Payment:</strong> {order.paymentMethod}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Pastorder;
