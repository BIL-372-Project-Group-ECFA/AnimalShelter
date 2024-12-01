// frontend/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import RoleSelection from "./furkiComponents/RoleSelection";
import ShelterSelection from "./furkiComponents/shelter/ShelterSelection";
import ManagerDashboard from "./furkiComponents/shelter/ManagerDashboard";
import UserEntry from "./furkiComponents/user/UserEntry";
import UserDashboard from "./furkiComponents/user/UserDashboard";
const App = () => {
  return (
    <AppProvider>
      {/* Sadece Routes ile rota tanımlamaları yapılır */}
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/shelter-selection" element={<ShelterSelection />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/user-entry" element={<UserEntry />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        {/* Diğer roller için rotalar eklenebilir */}
      </Routes>
    </AppProvider>
  );
};

export default App;
