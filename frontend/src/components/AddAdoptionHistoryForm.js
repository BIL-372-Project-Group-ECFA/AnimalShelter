import React, { useState } from 'react';
import { addAdoptionHistory } from '../api/adoption_history';
import '../styles/AddAdoptionHistoryForm.css'; // Import the corresponding CSS file

const AddAdoptionHistoryForm = () => {
  const [adopterId, setAdopterId] = useState('');
  const [shelterId, setShelterId] = useState('');
  const [adoptionDate, setAdoptionDate] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adoptionHistoryData = { adopterId, shelterId, adoptionDate, animalId };
      await addAdoptionHistory(adoptionHistoryData);
      alert('Adoption history added successfully!');
      // Reset form
      setAdopterId('');
      setShelterId('');
      setAdoptionDate('');
      setAnimalId('');
    } catch (err) {
      alert("Failed to add adoption history: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Add Adoption History</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Adopter ID:</label>
          <input
            type="text"
            value={adopterId}
            onChange={(e) => setAdopterId(e.target.value)}
            required
          />
        </div>
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
          <label>Adoption Date:</label>
          <input
            type="date"
            value={adoptionDate}
            onChange={(e) => setAdoptionDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Animal ID:</label>
          <input
            type="text"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Adoption History</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddAdoptionHistoryForm;
