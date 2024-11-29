import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RoleSelection = () => {
  const { setRole } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole); // Rolü global state'e kaydet
    navigate("/shelter-selection"); // Barınak seçimine yönlendir
  };

  return (
    <div>
      <h1>Rol Seçimi</h1>
      <button onClick={() => handleRoleSelection("manager")}>Barınak Yöneticisi</button>
      <button onClick={() => handleRoleSelection("user")}>Ana Kullanıcı</button>
      <button onClick={() => handleRoleSelection("veterinarian")}>Veteriner</button>
    </div>
  );
};

export default RoleSelection;
