import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaBuilding, FaUser, FaStethoscope } from "react-icons/fa"; // Import icons
import "./RoleSelection.css"; // CSS file

const RoleSelection = () => {
  const { setRole } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole); // Save role to global state
    if(selectedRole === "manager")
      navigate("/shelter-selection"); // Navigate to shelter selection
    else if(selectedRole === "user")
      navigate("/user-entry");
  };

  return (
    <div className="role-selection-container">
      <h1>ROL SEÇİMİ</h1>
      <div className="role-cards">
        <div
          className="role-card"
          onClick={() => handleRoleSelection("manager")}
        >
          <FaBuilding className="role-icon" />
          <h2>Barınak Yöneticisi</h2>
          <p>Barınaktaki işlemleri yönetin ve kontrol edin.</p>
        </div>
        <div className="role-card" onClick={() => handleRoleSelection("user")}>
          <FaUser className="role-icon" />
          <h2>Ana Kullanıcı</h2>
          <p>Hayvanları sahiplenin ve barınakları keşfedin.</p>
        </div>
        <div
          className="role-card"
          onClick={() => handleRoleSelection("veterinarian")}
        >
          <FaStethoscope className="role-icon" />
          <h2>Veteriner</h2>
          <p>Hayvan sağlığı ile ilgili süreçleri yönetin.</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
