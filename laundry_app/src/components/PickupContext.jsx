import React, { createContext, useState, useContext } from "react";

const PickupContext = createContext();

export const usePickup = () => {
  return useContext(PickupContext);
};

export const PickupProvider = ({ children }) => {
  const [pickupDetails] = useState({
    pickupDate: "2025-04-23",
    dropoffDate: "2025-04-24",
    timeSlot: "10:00 AM - 12:00 PM",
    isExpress: false,
  });

  const [selectedAgent] = useState("Bharath");

  return (
    <PickupContext.Provider value={{ pickupDetails, selectedAgent }}>
      {children}
    </PickupContext.Provider>
  );
};
