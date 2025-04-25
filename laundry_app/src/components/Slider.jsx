import React, { useState } from "react";
import "./Slider.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Navbar from "./NavBar";

const slides = [
  {
    id: 1,
    title: "SPREE O'CLOCK",
    subtitle: "IT’S ABOUT TIME",
    image: "/assets/images/slider 1.jpg",
  },
  {
    id: 2,
    title: "WASH DAY WIN",
    subtitle: "MAKE IT EASY",
    image: "/assets/images/slider 2.jpg",
  },
  {
    id: 3,
    title: "FRESH START",
    subtitle: "EVERY LOAD MATTERS",
    image: "/assets/images/slider 4.jpg",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <div>
      <Navbar />
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            className={index === current ? "slide active" : "slide"}
            key={slide.id}
          >
            {index === current && (
              <>
                <div className="slide__content">
                  <h1>{slide.title}</h1>
                  <h3>{slide.subtitle}</h3>
                </div>
                <div className="slide__image">
                  <img src={slide.image} alt={slide.title} />
                </div>
              </>
            )}
          </div>
        ))}
        <FaAngleLeft className="arrow left" onClick={prevSlide} />
        <FaAngleRight className="arrow right" onClick={nextSlide} />

        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={index === current ? "dot active" : "dot"}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
