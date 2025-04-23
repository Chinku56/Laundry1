import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Group items by name and calculate the total price
  const groupedItems = cartItems.reduce((acc, item) => {
    const key = item.name;
    acc[key] = acc[key] || { ...item, quantity: 0 };
    acc[key].quantity += 1;
    return acc;
  }, {});

  const itemsArray = Object.values(groupedItems);
  const total = itemsArray.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle the "Clear Cart" button click
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear all items from your cart?')) {
      clearCart(); // This will clear the cart
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {itemsArray.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {itemsArray.map((item, index) => (
              <li key={index} className="cart-item">
                <span className="item-name">{item.icon} {item.name}</span>
                <div className="item-controls">
                  <button onClick={() => removeFromCart(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
                <span className="item-price">₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>

            {/* Clear Cart Button */}
            <button className="clear-cart-btn" onClick={handleClearCart}>
              Clear Cart
            </button> <br />

            <button
              className="pay-btn"
              onClick={() => navigate('/Pickup', { state: { total } })}
            >
              Proceed to Schedule
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

