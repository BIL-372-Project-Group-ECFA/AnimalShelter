import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(null); // Kullanıcının seçtiği rol
  const [selectedShelter, setSelectedShelter] = useState(null); // Seçilen barınak
  const [userId, setUserId] = useState(null);

  return (
    <AppContext.Provider value={{role, setRole, selectedShelter, setSelectedShelter, userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};
