import React, { useState } from "react";
import { deleteVeterinarian } from "../api/veterinarians";
import "../styles/DeleteVeterinarianForm.css"; // CSS dosyasını import et

const DeleteVeterinarianForm = () => {
  const [veterinarianId, setVeterinarianId] = useState("");
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteVeterinarian(veterinarianId); // Veteriner silme işlemi
      alert("Veterinarian deleted successfully!");
      setVeterinarianId(""); // Formu resetle
    } catch (err) {
      console.error("Failed to delete veterinarian:", err);
      setError("Failed to delete veterinarian: " + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Delete Veterinarian</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Veterinarian ID:</label>
          <input
            type="text"
            value={veterinarianId}
            onChange={(e) => setVeterinarianId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Veterinarian</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteVeterinarianForm;
