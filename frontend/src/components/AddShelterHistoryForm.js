import React, { useState } from 'react';
import { addShelterHistory } from '../api/shelterHistory';
import '../styles/AddShelterHistoryForm.css'; // CSS dosyasını import et

const AddShelterHistoryForm = () => {
  const [animalId, setAnimalId] = useState('');
  const [shelterId, setShelterId] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const shelterHistoryData = { 
        animal_id: parseInt(animalId), 
        shelter_id: shelterId ? parseInt(shelterId) : null,
        arrival_date: arrivalDate 
      };
      await addShelterHistory(shelterHistoryData);
      alert('Shelter history added successfully!');
      // Reset form
      setAnimalId('');
      setShelterId('');
      setArrivalDate('');
    } catch (err) {
      alert('Failed to add shelter history: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Add Shelter History</h2>
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
          <label>Arrival Date:</label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Shelter History</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddShelterHistoryForm;
