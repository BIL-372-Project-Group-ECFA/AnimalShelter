import React, { useState } from "react";
import { deleteAdoptionHistory } from "../api/adoption_history";
import "../styles/DeleteAdoptionHistoryForm.css"; // Import the corresponding CSS file

const DeleteAdoptionHistoryForm = () => {
  const [adoptionId, setAdoptionId] = useState("");
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteAdoptionHistory(adoptionId); // Adoption history delete operation
      alert("Adoption history deleted successfully!");
      setAdoptionId(""); // Reset the form
    } catch (err) {
      console.error("Failed to delete adoption history:", err);
      setError("Failed to delete adoption history: " + err.message); // Display error message
    }
  };

  return (
    <div>
      <h2>Delete Adoption History</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Adoption ID:</label>
          <input
            type="text"
            value={adoptionId}
            onChange={(e) => setAdoptionId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Adoption History</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteAdoptionHistoryForm;
