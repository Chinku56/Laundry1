import React from "react";
import "./Notificationcard.scss";

const NotificationCard = ({ type, message, time, read, onMarkRead }) => {
  return (
    <div className={`notification-card ${read ? "read" : "unread"}`}>
      <div className="notification-card__content">
        <div className="notification-card__type">{type}</div>
        <div className="notification-card__message">{message}</div>
        <div className="notification-card__time">{time}</div>
      </div>
      {!read && (
        <button className="notification-card__mark" onClick={onMarkRead}>
          Mark as Read
        </button>
      )}
    </div>
  );
};

export default NotificationCard;
