import React, { useState } from 'react';
import { addCurrentAdoption } from '../api/currentAdoptions';
import '../styles/AddCurrentAdoptionForm.css'; // CSS dosyasını import et

const AddCurrentAdoptionForm = () => {
  const [animalId, setAnimalId] = useState('');
  const [adoptionId, setAdoptionId] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentAdoptionData = { animal_id: parseInt(animalId), adoption_id: parseInt(adoptionId) };
      await addCurrentAdoption(currentAdoptionData);
      alert('Current adoption added successfully!');
      // Reset form
      setAnimalId('');
      setAdoptionId('');
    } catch (err) {
      alert('Failed to add current adoption: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Add Current Adoption</h2>
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
          <label>Adoption ID:</label>
          <input
            type="number"
            value={adoptionId}
            onChange={(e) => setAdoptionId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Current Adoption</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddCurrentAdoptionForm;
