import React from "react";
import "./OurProcess.scss";

const steps = [
  {
    title: "Just A Click",
    description: `It’s absurdly simple. Select the wash and iron option on the app, scroll down and pick the apparel categories that match your load, add the number of pieces against each of them and order – that’s it.`,
    icon: "👔",
  },
  {
    title: "Ready To Pick",
    description: `Our associate will be at your doorstep, after a speedy ride in our 100% electric van to pick up and bag your items and head right back to our premises.`,
    icon: "🧺",
  },
  {
    title: "Now That’s Slick",
    description: `At our world-class facility, the smooth process begins, for washing, drying and ironing, all keeping hygiene, precision and care in mind.`,
    icon: "🧼",
  },
  {
    title: "Isn’t That Quick",
    description: `And our associate then heads back to your door, bearing 100% no–plastic packaging stacked with fresh, clean and crisply ironed clothes.`,
    icon: "📦",
  },
];

const OurProcess = () => {
  return (
    <div className="our-process">
      <h2>Our Process</h2>
      <p className="subtitle">(What makes us tick, tick, tick...)</p>
      <p className="description">
        A wash and iron service online that delivers in 24 hours is not an
        unreasonable ask! It can be done in a few quick clicks.
      </p>
      <div className="process-steps">
        {steps.map((step, index) => (
          <div className="step" key={index}>
            <div className="icon" style={{ fontSize: "100px" }}>
              {step.icon}
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProcess;
