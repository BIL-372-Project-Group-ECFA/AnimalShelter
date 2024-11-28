import React, { useState } from 'react';
import { addAdoptionHistory } from '../api/adoptionHistory'; // Import the addAdoptionHistory function
import '../styles/AddAdoptionHistoryForm.css'; // CSS dosyasını import et

const AddAdoptionHistoryForm = () => {
  const [animalId, setAnimalId] = useState('');
  const [shelterId, setShelterId] = useState('');
  const [adopterId, setAdopterId] = useState('');
  const [adoptionDate, setAdoptionDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adoptionData = { 
        animal_id: parseInt(animalId), 
        shelter_id: parseInt(shelterId), 
        adopter_id: parseInt(adopterId), 
        adoption_date: adoptionDate 
      };
      await addAdoptionHistory(adoptionData);
      alert('Adoption history added successfully!');
      // Reset form
      setAnimalId('');
      setShelterId('');
      setAdopterId('');
      setAdoptionDate('');
    } catch (err) {
      alert("Failed to add adoption history: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Add Adoption History</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Adoption Date:</label>
          <input
            type="date"
            value={adoptionDate}
            onChange={(e) => setAdoptionDate(e.target.value)}
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
