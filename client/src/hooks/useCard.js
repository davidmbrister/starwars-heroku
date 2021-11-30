import React, { createContext, useState, useContext } from "react";

// The purpose of this shared context is to allow the changing, from multiple components (List, SearchBox),
// of the id used for fetching a single character's info

const CardIDContext = createContext();

export const useCardId = () => useContext(CardIDContext);

export function CardProvider({ children }) {
  // store cardID as a string but do a simple parseInt to make sure it's an int
  const [cardID, setCardID] = useState(1);
  const isValidInput = (id) => {
    if (isNaN(parseInt(id)) || id === cardID) {
      return false;
    } else {
      return true;
    } 
  };
  const setCardData = (id) => {
    if (!isValidInput(id)) return;
    setCardID(id);
  };
  const getCardData = () => cardID

  return (
    <CardIDContext.Provider value={{ setCardData, getCardData }}>
      {children}
    </CardIDContext.Provider>
  );
}
