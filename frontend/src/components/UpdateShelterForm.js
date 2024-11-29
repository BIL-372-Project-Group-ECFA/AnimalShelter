import React, { useState } from "react";
import { updateShelter } from "../api/shelters";
import "../styles/UpdateShelterForm.css"; // CSS dosyasını import et

const UpdateShelterForm = () => {
  const [shelterId, setShelterId] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [currentAnimalCount, setCurrentAnimalCount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      location,
      capacity: parseInt(capacity),
      current_animal_count: parseInt(currentAnimalCount),
      phone_number: phoneNumber,
    };

    try {
      await updateShelter(shelterId, updatedData);
      alert("Shelter updated successfully!");
      // Reset form
      setShelterId("");
      setLocation("");
      setCapacity("");
      setCurrentAnimalCount("");
      setPhoneNumber("");
    } catch (err) {
      console.error("Failed to update shelter:", err);
      setError("Failed to update shelter: " + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Update Shelter</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Shelter ID:</label>
          <input
            type="text"
            value={shelterId}
            onChange={(e) => setShelterId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div>
          <label>Current Animal Count:</label>
          <input
            type="number"
            value={currentAnimalCount}
            onChange={(e) => setCurrentAnimalCount(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit">Update Shelter</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateShelterForm;
