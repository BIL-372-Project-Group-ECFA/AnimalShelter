import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(null); // Kullanıcının seçtiği rol
  const [selectedShelter, setSelectedShelter] = useState(null); // Seçilen barınak

  return (
    <AppContext.Provider value={{ role, setRole, selectedShelter, setSelectedShelter }}>
      {children}
    </AppContext.Provider>
  );
};
