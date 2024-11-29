import React, { useState } from "react";
import { updateAdoptionHistory } from "../api/adoptionHistory";  // API'den import et
import "../styles/UpdateAdoptionHistoryForm.css"; // CSS dosyasını import et

const UpdateAdoptionHistoryForm = () => {
  const [adoptionHistoryId, setAdoptionHistoryId] = useState("");  // Adoption history ID
  const [shelterId, setShelterId] = useState("");  // Shelter ID
  const [adopterId, setAdopterId] = useState("");  // Adopter ID
  const [animalId, setAnimalId] = useState("");  // Animal ID
  const [adoptionDate, setAdoptionDate] = useState("");  // Adoption Date
  const [error, setError] = useState(null);  // Error state

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      shelter_id: parseInt(shelterId),
      adopter_id: parseInt(adopterId),
      animal_id: parseInt(animalId),
      adoption_date: adoptionDate,
    };
    try {
      await updateAdoptionHistory(adoptionHistoryId, updatedData);
      alert("Adoption history updated successfully!");
      // Reset form
      setAdoptionHistoryId("");
      setShelterId("");
      setAdopterId("");
      setAnimalId("");
      setAdoptionDate("");
    } catch (err) {
      console.error("Failed to update adoption history:", err);
      setError("Failed to update adoption history: " + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Update Adoption History</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Adoption History ID:</label>
          <input
            type="text"
            value={adoptionHistoryId}
            onChange={(e) => setAdoptionHistoryId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Shelter ID:</label>
          <input
            type="number"
            value={shelterId}
            onChange={(e) => setShelterId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Adopter ID:</label>
          <input
            type="number"
            value={adopterId}
            onChange={(e) => setAdopterId(e.target.value)}
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
          <label>Adoption Date:</label>
          <input
            type="date"
            value={adoptionDate}
            onChange={(e) => setAdoptionDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Adoption History</button>
        {error && <p style={{ color: "red" }}>{error}</p>}  {/* Error message display */}
      </form>
    </div>
  );
};

export default UpdateAdoptionHistoryForm;
