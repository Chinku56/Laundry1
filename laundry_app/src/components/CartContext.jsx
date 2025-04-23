// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   const addToCart = (item) => {
//     setCartItems((prev) => [...prev, item]);
//   };

//   const removeFromCart = (item) => {
//     setCartItems((prev) => {
//       const index = prev.findIndex((i) => i.name === item.name);
//       if (index !== -1) {
//         const updated = [...prev];
//         updated.splice(index, 1);
//         return updated;
//       }
//       return prev;
//     });
//   };

//   useEffect(() => {
//     const newTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
//     setTotal(newTotal);
//   }, [cartItems]);

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, total }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (item) => {
    setCartItems((prev) => {
      const index = prev.findIndex((i) => i.name === item.name);
      if (index !== -1) {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCartItems([]); // Clear all items
  };

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotal(newTotal);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
