import React, { useState, useContext, useEffect } from "react";
import "./WashFoldPrices.scss";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import Loader from "./Loader";
import Navbar from "./NavBar";

const tabs = ["Men", "Women", "Kids", "House Hold"];

const data = {
  Men: [
    { name: "Shirt Half Standard Pack", price: 25, icon: "👕" },
    { name: "Trousers Standard Pack", price: 40, icon: "👖" },
    { name: "Shorts Standard Pack", price: 30, icon: "🩳" },
    { name: "Half Jacket Standard Pack", price: 100, icon: "🧥" },
    { name: "Kurta Standard Pack", price: 40, icon: "👘" },
    { name: "Sweatshirt Standard Pack", price: 75, icon: "🧢" },
  ],
  Women: [
    { name: "T-Shirt Half Standard Pack", price: 25, icon: "👚" },
    { name: "Jeans Standard Pack", price: 50, icon: "👖" },
    { name: "Jacket Hanger Pack", price: 150, icon: "🧥" },
    { name: "Sweater Premium Pack", price: 75, icon: "🧶" },
    { name: "Churidar/Pyjama Standard Pk", price: 40, icon: "👗" },
    { name: "Trackpant Standard Pack", price: 40, icon: "👖" },
  ],
  Kids: [
    { name: "Shirt", price: 25, icon: "🧥" },
    { name: "Trousers/Jeans", price: 30, icon: "👖" },
    { name: "Kurta", price: 25, icon: "👘" },
    { name: "Shorts", price: 15, icon: "🩳" },
    { name: "Inners", price: 25, icon: "🧥" },
  ],
  "House Hold": [
    { name: "Apron", price: 50, icon: "🧤" },
    { name: "Bed Sheet Single", price: 50, icon: "🛏️" },
    { name: "Bed Sheet Double", price: 80, icon: "🛏️" },
    { name: "Bed Cover Single", price: 75, icon: "🛏️" },
    { name: "Bed Cover Double", price: 125, icon: "🛏️" },
    { name: "Pillow Cover Single", price: 25, icon: "🛌" },
    { name: "Blanket Single", price: 100, icon: "🛌" },
    { name: "Blanket Double", price: 150, icon: "🛌" },
    { name: "Blanket Cover Single", price: 75, icon: "🛌" },
    { name: "Blanket Cover Double", price: 125, icon: "🛌" },
    { name: "Quilt Single", price: 120, icon: "🛌" },
    { name: "Quilt Double", price: 150, icon: "🛌" },
  ],
};

const WashFoldPrices = () => {
  const [activeTab, setActiveTab] = useState("Men");
  const { cartItems, addToCart, removeFromCart, total } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getItemCount = (item) => {
    return cartItems.filter((i) => i.name === item.name).length;
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader text="Sometimes I feel like throwing in the towel but that would only mean more laundry for me..." />
      ) : (
        <div className="washfold-container">
          <h2 className="title">Wash & Fold Prices</h2>
          <p className="subtitle">
            Amazingly affordable is the only way to phrase it. That too for a
            wash and fold service. Happens when the tech kicks in.
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
      )}
    </div>
  );
};

export default WashFoldPrices;
