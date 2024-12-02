// frontend/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import RoleSelection from "./furkiComponents/RoleSelection";
import ShelterSelection from "./furkiComponents/shelter/ShelterSelection";
import ManagerDashboard from "./furkiComponents/shelter/ManagerDashboard";

import UserEntry from "./furkiComponents/user/UserEntry";
import UserDashboard from "./furkiComponents/user/UserDashboard";
import UserOverview from "./furkiComponents/user/UserOverview";
import MakeDonations from "./furkiComponents/user/MakeDonations";
import DonationHistory from "./furkiComponents/user/DonationHistory";
import AdoptNewAnimal from "./furkiComponents/user/AdoptNewAnimal";

import AdminDashboard from "./furkiComponents/admin/AdminDashboard";
import AddAnimal from "./furkiComponents/admin/AddAnimal";
import AddShelter from "./furkiComponents/admin/AddShelter";
import AddVaccine from "./furkiComponents/admin/AddVaccine";
import AddVet from "./furkiComponents/admin/AddVet";

import ShelterSelectionVet from "./furkiComponents/vet/ShelterSelectionVet";
import ManagerDashboardVet from "./furkiComponents/vet/ManagerDashboardVet";



import CreateMedicalRecord from "./furkiComponents/vet/CreateMedicalRecord";
import MedicalRecordDetails from "./furkiComponents/vet/MedicalRecordDetails";


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
        <Route path="/user-dashboard" element={<UserOverview />} />
        <Route path="/user-dashboard" element={<MakeDonations />} />
        <Route path="/user-dashboard" element={<DonationHistory />} />
        <Route path="/user-dashboard" element={<AdoptNewAnimal />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AddAnimal />} />
        <Route path="/admin-dashboard" element={<AddShelter />} />
        <Route path="/admin-dashboard" element={<AddVaccine />} />
        <Route path="/admin-dashboard" element={<AddVet />} />

        <Route path="/veterinarian-dashboard-shelter" element={<ShelterSelectionVet />} />
        <Route path="/veterinarian-dashboard" element={<ManagerDashboardVet />} />


        <Route path="/veterinarian-dashboard" element={<CreateMedicalRecord />} />
        <Route path="/veterinarian-dashboard" element={<MedicalRecordDetails />} />

        {/* Diğer roller için rotalar eklenebilir */}
      </Routes>
    </AppProvider>
  );
};

export default App;
