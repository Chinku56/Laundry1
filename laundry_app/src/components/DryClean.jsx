import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DryClean.scss";
import { CartContext } from "../components/CartContext";
import Navbar from "./NavBar";
import Loader from "../components/Loader";

const tabs = ["Men", "Women", "Kids", "House Hold"];

const data = {
  Men: [
    { name: "Shirt Dry Clean", price: 75, icon: "👕" },
    { name: "Trousers Dry Clean", price: 95, icon: "👖" },
    { name: "Shorts Dry Clean", price: 70, icon: "🩳" },
    { name: "Half Jacket Dry Clean", price: 165, icon: "🧥" },
    { name: "Kurta Dry Clean", price: 95, icon: "👘" },
    { name: "Sweatshirt Dry Clean", price: 120, icon: "🧢" },
  ],
  Women: [
    { name: "T-Shirt Dry Clean", price: 75, icon: "👚" },
    { name: "Jeans Dry Clean", price: 95, icon: "👖" },
    { name: "Jacket Dry Clean", price: 220, icon: "🧥" },
    { name: "Sweater Dry Clean", price: 120, icon: "🧶" },
    { name: "Churidar Dry Clean", price: 95, icon: "👗" },
    { name: "Trackpant Dry Clean", price: 95, icon: "👖" },
  ],
  Kids: [
    { name: "Shirt Dry Clean", price: 70, icon: "🧥" },
    { name: "Trousers Dry Clean", price: 75, icon: "👖" },
    { name: "Kurta Dry Clean", price: 70, icon: "👘" },
    { name: "Shorts Dry Clean", price: 65, icon: "🩳" },
    { name: "Inners Dry Clean", price: 55, icon: "🧥" },
  ],
  "House Hold": [
    { name: "Apron Dry Clean", price: 85, icon: "🧤" },
    { name: "Bed Sheet Single Dry", price: 85, icon: "🛏️" },
    { name: "Bed Sheet Double Dry", price: 120, icon: "🛏️" },
    { name: "Bed Cover Single Dry", price: 110, icon: "🛏️" },
    { name: "Bed Cover Double Dry", price: 170, icon: "🛏️" },
    { name: "Pillow Cover Dry Clean", price: 65, icon: "🛌" },
    { name: "Blanket Dry Clean", price: 190, icon: "🛌" },
    { name: "Quilt Dry Clean", price: 250, icon: "🛌" },
  ],
};

const DryClean = () => {
  const [activeTab, setActiveTab] = useState("Men");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, removeFromCart, total } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getItemCount = (item) => {
    return cartItems.filter((i) => i.name === item.name).length;
  };

  const filteredItems = data[activeTab].filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Loader text="There is no such thing as a dull life; only ones that are full of laundry..." />;
  }

  return (
    <div className="dryclean-page">
      <Navbar />

      <div className="dryclean-container">
        <h2 className="title">Dry Clean Prices</h2>
        <p className="subtitle">
          Get your garments professionally dry cleaned with care and precision!
        </p>

        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${tab === activeTab ? "active" : ""}`}
              onClick={() => {
                setSearch("");
                setActiveTab(tab);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="price-list">
          {filteredItems.length === 0 ? (
            <p className="empty">No matching items found!</p>
          ) : (
            filteredItems.map((item, index) => {
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
            })
          )}

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
    </div>
  );
};

export default DryClean;
