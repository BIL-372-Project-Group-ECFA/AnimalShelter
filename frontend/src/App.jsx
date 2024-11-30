// frontend/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import RoleSelection from "./furkiComponents/RoleSelection";
import ShelterSelection from "./furkiComponents/shelter/ShelterSelection";
import ManagerDashboard from "./furkiComponents/shelter/ManagerDashboard";
import UserEntry from "./furkiComponents/user/UserEntry";

const App = () => {
  return (
    <AppProvider>
      {/* Sadece Routes ile rota tanımlamaları yapılır */}
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/shelter-selection" element={<ShelterSelection />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/user-entry" element={<UserEntry />} />
        {/* Diğer roller için rotalar eklenebilir */}
      </Routes>
    </AppProvider>
  );
};

export default App;
