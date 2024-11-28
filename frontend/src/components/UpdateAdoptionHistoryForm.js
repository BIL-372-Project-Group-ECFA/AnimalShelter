import React, { useState } from "react";
import { updateAdoptionHistory } from "../api/adoption_history";
import "../styles/UpdateAdoptionHistoryForm.css"; // Import the corresponding CSS file

const UpdateAdoptionHistoryForm = () => {
  const [adoptionId, setAdoptionId] = useState("");
  const [shelterId, setShelterId] = useState("");
  const [adopterId, setAdopterId] = useState("");
  const [adoptionDate, setAdoptionDate] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { shelterId, adopterId, adoptionDate, animalId };

    try {
      await updateAdoptionHistory(adoptionId, updatedData);
      alert("Adoption history updated successfully!");
      // Reset form
      setAdoptionId("");
      setShelterId("");
      setAdopterId("");
      setAdoptionDate("");
      setAnimalId("");
    } catch (err) {
      console.error("Failed to update adoption history:", err);
      setError("Failed to update adoption history: " + err.message); // Display error message
    }
  };

  return (
    <div>
      <h2>Update Adoption History</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Adoption ID:</label>
          <input
            type="text"
            value={adoptionId}
            onChange={(e) => setAdoptionId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Shelter ID:</label>
          <input
            type="text"
            value={shelterId}
            onChange={(e) => setShelterId(e.target.value)}
          />
        </div>
        <div>
          <label>Adopter ID:</label>
          <input
            type="text"
            value={adopterId}
            onChange={(e) => setAdopterId(e.target.value)}
          />
        </div>
        <div>
          <label>Adoption Date:</label>
          <input
            type="date"
            value={adoptionDate}
            onChange={(e) => setAdoptionDate(e.target.value)}
          />
        </div>
        <div>
          <label>Animal ID:</label>
          <input
            type="text"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
          />
        </div>
        <button type="submit">Update Adoption History</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateAdoptionHistoryForm;
