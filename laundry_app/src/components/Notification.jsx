import React, { useState } from "react";
import Notificationcard from "../components/Notificationcard";
import "./Notification.scss";
import Navbar from "./NavBar";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Order",
      message: "Your laundry is ready for pickup.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 2,
      type: "Promo",
      message: "Flash Sale: 25% off washes today!",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      type: "Reminder",
      message: "Pickup order #A102 tomorrow.",
      time: "2 days ago",
      read: true,
    },
    {
      id: 4,
      type: "Reminder",
      message: "Pickup order #A103 dayafter tomorrow.",
      time: "4 days ago",
      read: true,
    },
    {
      id: 5,
      type: "Reminder",
      message: "Pickup order #A106 On the way.",
      time: "7 days ago",
      read: false,
    },
  ]);

  const handleMarkRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
  };

  return (
    <>
      <Navbar />
      <div className="notifications-page">
        <h2>Notifications</h2>
        <div className="notifications-page__list">
          {notifications.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            notifications.map((n) => (
              <Notificationcard
                key={n.id}
                {...n}
                onMarkRead={() => handleMarkRead(n.id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
