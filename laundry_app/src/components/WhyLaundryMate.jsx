import React from "react";
import "./WhyLaundryMate.scss";
import {
  FaMapMarkerAlt,
  FaDoorOpen,
  FaHandsHelping,
  FaWallet,
} from "react-icons/fa";

const reasons = [
  {
    title: "At Hyderabad",
    icon: <FaMapMarkerAlt />,
    description:
      "A professional laundry service near you that delivers high standards of quality, care and service. So reassuring, isn’t it?",
  },
  {
    title: "At your door",
    icon: <FaDoorOpen />,
    description:
      "Get laundry pickup and drop right where you are – no stepping out or chasing or waiting or worrying. How convenient is that?",
  },
  {
    title: "At your service",
    icon: <FaHandsHelping />,
    description:
      "When we say 24-hour laundry service, it’s exactly that – because it’s on-the-spot, on-the-dot. What’s that word you immediately thought of… clockwork?",
  },
  {
    title: "At irresistible prices",
    icon: <FaWallet />,
    description:
      "You’d never have guessed how amazingly affordable it is. You can even ask for reprocessing or a refund, no questions asked. Isn’t that thoughtful?",
  },
];

const WhyLaundryMate = () => {
  return (
    <section className="why-laundrymate">
      <h2>Why Wash-O-Matic?</h2>
      <p className="subtitle">(Why ever not, actually?)</p>
      <p className="description">
        Word’s got around, hasn’t it? We are Hyderabad’s shiny new app backed by
        world-class facilities. We pick up and deliver at your doorstep... and
        that too at amazingly affordable prices. Everyday laundry, next-day
        delivery! Couldn’t get better than that.
      </p>

      <div className="reasons">
        {reasons.map((item, idx) => (
          <div className="reason" key={idx}>
            <div className="icon">{item.icon}</div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyLaundryMate;
