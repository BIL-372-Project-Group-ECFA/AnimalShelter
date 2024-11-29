import React, { useState } from "react";
import { deleteShelter } from "../api/shelters";
import "../styles/DeleteShelterForm.css"; // CSS dosyasını import et

const DeleteShelterForm = () => {
  const [shelterId, setShelterId] = useState("");
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteShelter(shelterId); // Shelter silme işlemi
      alert("Shelter deleted successfully!");
      setShelterId(""); // Formu resetle
    } catch (err) {
      console.error("Failed to delete shelter:", err);
      setError("Failed to delete shelter: " + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Delete Shelter</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Shelter ID:</label>
          <input
            type="text"
            value={shelterId}
            onChange={(e) => setShelterId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Shelter</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteShelterForm;
