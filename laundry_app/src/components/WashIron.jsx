import React, { useState, useContext } from "react";
import "./WashIron.scss";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import Navbar from "./NavBar";

const tabs = ["Men", "Women", "Kids", "House Hold"];

const data = {
  Men: [
    { name: "Shirt Half Iron Pack", price: 30, icon: "👕" },
    { name: "Trousers Iron Pack", price: 50, icon: "👖" },
    { name: "Shorts Iron Pack", price: 35, icon: "🩳" },
    { name: "Half Jacket Iron Pack", price: 110, icon: "🧥" },
    { name: "Kurta Iron Pack", price: 50, icon: "👘" },
    { name: "Sweatshirt Iron Pack", price: 85, icon: "🧢" },
  ],
  Women: [
    { name: "T-Shirt Iron Pack", price: 30, icon: "👚" },
    { name: "Jeans Iron Pack", price: 60, icon: "👖" },
    { name: "Jacket Iron Pack", price: 160, icon: "🧥" },
    { name: "Sweater Iron Pack", price: 85, icon: "🧶" },
    { name: "Churidar Iron Pack", price: 50, icon: "👗" },
    { name: "Trackpant Iron Pack", price: 50, icon: "👖" },
  ],
  Kids: [
    { name: "Shirt Iron", price: 30, icon: "🧥" },
    { name: "Trousers Iron", price: 35, icon: "👖" },
    { name: "Kurta Iron", price: 30, icon: "👘" },
    { name: "Shorts Iron", price: 20, icon: "🩳" },
    { name: "Inners Iron", price: 30, icon: "🧥" },
  ],
  "House Hold": [
    { name: "Apron Iron", price: 60, icon: "🧤" },
    { name: "Bed Sheet Single Iron", price: 60, icon: "🛏️" },
    { name: "Bed Sheet Double Iron", price: 90, icon: "🛏️" },
    { name: "Bed Cover Single Iron", price: 85, icon: "🛏️" },
    { name: "Bed Cover Double Iron", price: 135, icon: "🛏️" },
    { name: "Pillow Cover Iron", price: 35, icon: "🛌" },
    { name: "Blanket Iron", price: 110, icon: "🛌" },
    { name: "Quilt Iron", price: 160, icon: "🛌" },
  ],
};

const WashIron = () => {
  const [activeTab, setActiveTab] = useState("Men");
  const { cartItems, addToCart, removeFromCart, total } =
    useContext(CartContext);
  const navigate = useNavigate();

  const getItemCount = (item) => {
    return cartItems.filter((i) => i.name === item.name).length;
  };

  return (
    <div>
      <Navbar />

      <div className="washiron-container">
        <h2 className="title">Wash & Iron Prices</h2>
        <p className="subtitle">
          Perfectly pressed, wrinkle-free clothes right to your doorstep. Get
          the magic of pro ironing.
        </p>

        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${tab === activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="price-list">
          {data[activeTab].map((item, index) => {
            const count = getItemCount(item);
            return (
              <div key={index} className="price-item">
                <div className="icon">{item.icon}</div>
                <div className="details">
                  <p>{item.name}</p>
                  <span>₹{item.price}</span>
                </div>
                <div className="controls">
                  <button
                    onClick={() => removeFromCart(item)}
                    disabled={count === 0}
                  >
                    -
                  </button>
                  <span>{count}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            );
          })}
          <div className="total">
            Total: ₹{total}
            <button
              className="pay-btn1"
              onClick={() => navigate("/cart")}
              style={{ marginLeft: "36%" }}
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WashIron;
