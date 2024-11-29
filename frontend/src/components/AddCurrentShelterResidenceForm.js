import React, { useState } from 'react';
import { addCurrentShelterResidence } from '../api/currentShelterResidence';
import '../styles/AddCurrentShelterResidenceForm.css'; // CSS dosyasını import et

const AddCurrentShelterResidenceForm = () => {
  const [animalId, setAnimalId] = useState('');
  const [shelterResidenceId, setShelterResidenceId] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentShelterResidenceData = { 
        animal_id: parseInt(animalId), 
        shelter_residence_id: shelterResidenceId ? parseInt(shelterResidenceId) : null 
      };
      await addCurrentShelterResidence(currentShelterResidenceData);
      alert('Current shelter residence added successfully!');
      // Reset form
      setAnimalId('');
      setShelterResidenceId('');
    } catch (err) {
      alert('Failed to add current shelter residence: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Add Current Shelter Residence</h2>
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
          <label>Shelter Residence ID (optional):</label>
          <input
            type="number"
            value={shelterResidenceId}
            onChange={(e) => setShelterResidenceId(e.target.value)}
          />
        </div>
        <button type="submit">Add Current Shelter Residence</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddCurrentShelterResidenceForm;
