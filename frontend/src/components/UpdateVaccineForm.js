import React, { useState } from "react";
import { updateVaccine } from "../api/vaccines";
import "../styles/UpdateVaccineForm.css"; // CSS dosyasını import et

const UpdateVaccineForm = () => {
  const [vaccineId, setVaccineId] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { vaccine_name: vaccineName };
    try {
      await updateVaccine(vaccineId, updatedData);
      alert("Vaccine updated successfully!");
      // Reset form
      setVaccineId("");
      setVaccineName("");
    } catch (err) {
      console.error("Failed to update vaccine:", err);
      setError("Failed to update vaccine: " + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Update Vaccine</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Vaccine ID:</label>
          <input
            type="text"
            value={vaccineId}
            onChange={(e) => setVaccineId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vaccine Name:</label>
          <input
            type="text"
            value={vaccineName}
            onChange={(e) => setVaccineName(e.target.value)}
          />
        </div>
        <button type="submit">Update Vaccine</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateVaccineForm;
