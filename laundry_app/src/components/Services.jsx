import React, { useState, useEffect } from "react";
import "./Services.scss";
import {
  FaTshirt,
  FaShoppingBasket,
  FaSteam,
  FaAngleRight,
} from "react-icons/fa";
import { MdDryCleaning } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";


const services = [
  { title: "WASH + FOLD", icon: <FaShoppingBasket />, color: "#0072c6" },
  { title: "WASH + IRON", icon: <FaTshirt />, color: "#c13ba9" },
  { title: "STEAM IRON", icon: <FaSteam />, color: "#6b45b5" },
  { title: "DRY CLEAN", icon: <MdDryCleaning />, color: "#00979c" },
];

const Services = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (index) => {
    if (index === 0) {
      navigate("/washfoldprices");
    } else if (index === 1) {
      navigate("/washiron");
    } else if (index === 2) {
      navigate("/steamiron");
    } else if (index === 3) {
      navigate("/dryclean");
    }
  };

  return (
    <>
      {loading ? (
        <Loader text="I’m pretty sure my laundry breeds while I sleep..." />
      ) : (
        <section className="services">
          <h2 className="services__title">Our Services</h2>
          <p className="services__subtitle">(Go ahead, make our day!)</p>
          <p className="services__description">
            Daily wear. Occasion wear. Clothes for just anytime and anywhere. If
            it’s about laundry, it’s about time you stopped doing it yourself.
            Leave it to us.
          </p>

          <div className="services__cards">
            {services.map((service, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleClick(index)}
                style={{ cursor: index === 0 ? "pointer" : "default" }}
              >
                <div className="card__inner">
                  <div
                    className="card__front"
                    style={{ backgroundColor: service.color }}
                  >
                    <div className="card__top">
                      <h3>{service.title}</h3>
                      <span className="card__arrow">
                        <FaAngleRight />
                      </span>
                    </div>
                    <div className="card__icon">{service.icon}</div>
                  </div>
                  <div className="card__back">
                    <p>
                      <strong>{service.title}</strong> service is quick,
                      affordable, and handled with care. <br />
                      Enjoy doorstep pickup and delivery for all your laundry
                      needs.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Services;
