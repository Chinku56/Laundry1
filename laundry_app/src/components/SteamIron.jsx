import React, { useState, useContext } from "react";
import "./SteamIron.scss";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";

const tabs = ["Men", "Women", "Kids", "House Hold"];

const data = {
  Men: [
    { name: "Shirt Half Steam Press", price: 35, icon: "👕" },
    { name: "Trousers Steam Press", price: 55, icon: "👖" },
    { name: "Shorts Steam Press", price: 40, icon: "🩳" },
    { name: "Half Jacket Steam Press", price: 115, icon: "🧥" },
    { name: "Kurta Steam Press", price: 55, icon: "👘" },
    { name: "Sweatshirt Steam Press", price: 90, icon: "🧢" },
  ],
  Women: [
    { name: "T-Shirt Steam Press", price: 35, icon: "👚" },
    { name: "Jeans Steam Press", price: 65, icon: "👖" },
    { name: "Jacket Steam Press", price: 170, icon: "🧥" },
    { name: "Sweater Steam Press", price: 90, icon: "🧶" },
    { name: "Churidar Steam Press", price: 55, icon: "👗" },
    { name: "Trackpant Steam Press", price: 55, icon: "👖" },
  ],
  Kids: [
    { name: "Shirt Steam Press", price: 35, icon: "🧥" },
    { name: "Trousers Steam Press", price: 40, icon: "👖" },
    { name: "Kurta Steam Press", price: 35, icon: "👘" },
    { name: "Shorts Steam Press", price: 25, icon: "🩳" },
    { name: "Inners Steam Press", price: 35, icon: "🧥" },
  ],
  "House Hold": [
    { name: "Apron Steam Press", price: 65, icon: "🧤" },
    { name: "Bed Sheet Single Steam", price: 65, icon: "🛏️" },
    { name: "Bed Sheet Double Steam", price: 95, icon: "🛏️" },
    { name: "Bed Cover Single Steam", price: 90, icon: "🛏️" },
    { name: "Bed Cover Double Steam", price: 140, icon: "🛏️" },
    { name: "Pillow Cover Steam Press", price: 40, icon: "🛌" },
    { name: "Blanket Steam Press", price: 120, icon: "🛌" },
    { name: "Quilt Steam Press", price: 170, icon: "🛌" },
  ],
};

const SteamIron = () => {
  const [activeTab, setActiveTab] = useState("Men");
  const { cartItems, addToCart, removeFromCart, total } =
    useContext(CartContext);
  const navigate = useNavigate();

  const getItemCount = (item) => {
    return cartItems.filter((i) => i.name === item.name).length;
  };

  return (
    <div className="steamiron-container">
      <h2 className="title">Steam Iron Prices</h2>
      <p className="subtitle">
        Premium steam press for a sharp, polished look. Your wardrobe deserves
        the best!
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
            style={{ marginLeft: "10%" }}
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SteamIron;
