import React, { useState } from "react";
import { updateVaccinationDetail } from "../api/vaccinationDetails";
import "../styles/UpdateVaccinationDetailForm.css"; // CSS dosyasını import et

// Form bileşeni burada

const UpdateVaccinationDetailForm = () => {
  const [vaccinationDetailId, setVaccinationDetailId] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [vaccinationTypeId, setVaccinationTypeId] = useState("");
  const [vaccinationDate, setVaccinationDate] = useState("");
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { 
      animal_id: parseInt(animalId), 
      vaccination_type_id: parseInt(vaccinationTypeId), 
      vaccination_date: vaccinationDate 
    };
    try {
      await updateVaccinationDetail(vaccinationDetailId, updatedData);
      alert("Vaccination detail updated successfully!");
      // Reset form
      setVaccinationDetailId("");
      setAnimalId("");
      setVaccinationTypeId("");
      setVaccinationDate("");
    } catch (err) {
      console.error("Failed to update vaccination detail:", err);
      setError("Failed to update vaccination detail: " + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Update Vaccination Detail</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Vaccination Detail ID:</label>
          <input
            type="text"
            value={vaccinationDetailId}
            onChange={(e) => setVaccinationDetailId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Animal ID:</label>
          <input
            type="number"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vaccination Type ID:</label>
          <input
            type="number"
            value={vaccinationTypeId}
            onChange={(e) => setVaccinationTypeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vaccination Date:</label>
          <input
            type="date"
            value={vaccinationDate}
            onChange={(e) => setVaccinationDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Vaccination Detail</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateVaccinationDetailForm;
