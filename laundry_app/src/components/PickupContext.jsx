import React, { createContext, useState, useContext } from 'react';

const PickupContext = createContext();

export const usePickup = () => useContext(PickupContext);

export const PickupProvider = ({ children }) => {
  const [pickupDetails, setPickupDetails] = useState({
    pickupDate: '2025-04-23',
    dropoffDate: '2025-04-24',
    timeSlot: '10:00 AM - 12:00 PM',
    isExpress: false,
  });

  const [selectedAgent, setSelectedAgent] = useState('Bharath');

  return (
    <PickupContext.Provider
      value={{
        pickupDetails,
        setPickupDetails,
        selectedAgent,
        setSelectedAgent,
      }}
    >
      {children}
    </PickupContext.Provider>
  );
};
