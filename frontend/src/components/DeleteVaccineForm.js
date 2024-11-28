import React, { useState } from "react";
import { deleteVaccine } from "../api/vaccines";
import "../styles/DeleteVaccineForm.css"; // CSS dosyasını import et

const DeleteVaccineForm = () => {
  const [vaccineId, setVaccineId] = useState("");
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteVaccine(vaccineId); // Vaccine silme işlemi
      alert("Vaccine deleted successfully!");
      setVaccineId(""); // Formu resetle
    } catch (err) {
      console.error("Failed to delete vaccine:", err);
      setError("Failed to delete vaccine: " + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Delete Vaccine</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Vaccine ID:</label>
          <input
            type="text"
            value={vaccineId}
            onChange={(e) => setVaccineId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Vaccine</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteVaccineForm;
