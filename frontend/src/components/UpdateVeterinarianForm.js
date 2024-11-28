import React, { useState } from "react";
import { updateVeterinarian } from "../api/veterinarians";
import "../styles/UpdateVeterinarianForm.css"; // CSS dosyasını import et

const UpdateVeterinarianForm = () => {
  const [veterinarianId, setVeterinarianId] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { contactNumber, licenseNumber, specialization };
    try {
      await updateVeterinarian(veterinarianId, updatedData);
      alert("Veterinarian updated successfully!");
      // Reset form
      setVeterinarianId("");
      setContactNumber("");
      setLicenseNumber("");
      setSpecialization("");
    } catch (err) {
      console.error("Failed to update veterinarian:", err);
      setError("Failed to update veterinarian: " + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Update Veterinarian</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Veterinarian ID:</label>
          <input
            type="text"
            value={veterinarianId}
            onChange={(e) => setVeterinarianId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>License Number:</label>
          <input
            type="text"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Specialization:</label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Veterinarian</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateVeterinarianForm;
