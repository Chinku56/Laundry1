import React from "react";
import "./Offers.scss";
import Navbar from "../NavBar";


const offers = [
  
  
  {
    title: "SPECIAL OFFER ON CLUBULTIMATE",
    discount: "PAN EXTENDED",
    code: "ONEMONTH",
    condition: "Offer valid on total order value of above ₹800.",
    validTill: "Offer valid till 30 April 2025.",
    terms: "Valid only on Dry Cleaning items in the order.",
    image: "/assets/images/dry.jpg",
    bgColor: "#FFCB05"
  },
  {
    title: "WEEKEND SPECIAL OFFER",
    discount: "25% OFF",
    code: "WEEKEND25",
    condition: "Offer valid on orders placed on Saturday and Sunday.",
    validTill: "Limited time weekend offer.",
    terms: "Applicable on all services.",
    image: "/assets/images/weekend.jpg",
    bgColor: "#F76C6C"
  },
  {
    title: "CLUBULITIMATE GOA COMBO OFFER",
    discount: "500/- + GOA OFF",
    code: "GOATRIP500",
    condition: "Minimum order value ₹1000.",
    validTill: "Offer valid till 15 May 2025.",
    terms: "Only for combo orders.",
    image: "/assets/images/clean.png",
    bgColor: "#6BCB77"
  },
  {
    title: "MONTHLY SAVER PACK",
    discount: "Up to ₹100 OFF",
    code: "CASHBACK100",
    condition: "Subscribe for monthly services.",
    validTill: "Offer valid till 31 May 2025.",
    terms: "Applicable only for monthly subscription plans.",
    image: "/assets/images/OIP.jpg",
    bgColor: "#4D96FF"
  },
  {
    title: "SUBSCRIPTION BONUS",
    discount: "FREE 1st SERVICE",
    code: "N/A",
    condition: "For new subscribers only.",
    validTill: "Offer valid for signups till 30 June 2025.",
    terms: "One-time use only.",
    image: "/assets/images/extra-bonus.jpg",
    bgColor: "#A66DD4"
  }
];

const Offers = () => {
  return (
    <div>
      <Navbar />
        
    
    <div className="offers-container">
      {offers.map((offer, index) => (
        <div
          className="offer-banner"
          key={index}
          style={{ backgroundColor: offer.bgColor }}
        >
          <div className="offer-text">
            <h2>{offer.title}</h2>
            <div className="offer-box">
              <div className="discount">{offer.discount}</div>
              <div className="code">
                USE CODE <strong>{offer.code}</strong>
              </div>
            </div>
            <p className="condition">{offer.condition}</p>
            <p className="terms">{offer.terms}</p>
            <p className="valid-till">{offer.validTill}</p>
          </div>
          <div className="offer-image">
            <img src={offer.image} alt={offer.title} />
          </div>
        </div>
      ))}
    </div>
  </div>
 
  );
};

export default Offers;
