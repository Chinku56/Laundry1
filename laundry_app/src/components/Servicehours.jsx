import React, { useState, useEffect } from "react";
import "./Servicehours.scss";
import Navbar from "./NavBar";
import Loader from "./Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const servicehours = [
  {
    type: "info",
    day: "Monday – Friday",
    time: "9:00 AM – 9:00 PM",
    message: "We’re open for all regular laundry and dry-cleaning services.",
  },
  {
    type: "success",
    day: "Saturday",
    time: "10:00 AM – 8:00 PM",
    message: "Weekend express service is available!",
  },
  {
    type: "warning",
    day: "Sunday",
    time: "10:00 AM – 6:00 PM",
    message: "Limited slots available. Book early!",
  },
  {
    type: "highlight",
    message:
      "📍 Pickup & Delivery available every day. Book via app or call us!",
  },
];

const Servicehours = () => {
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
        <Loader text="The more laundry I do, the less nudists seem crazy..." />
      ) : (
        <>
          <Navbar />
          <div className="message-service-hours">
            <h1>🕒 Service Hours</h1>
            <div className="messages">
              {servicehours.map((slot, idx) => (
                <div key={idx} className={`message-box ${slot.type}`}>
                  <h2>{slot.day && `${slot.day} – ${slot.time}`}</h2>
                  <p>{slot.message}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Servicehours;
