import React, { useState } from 'react';
import { updateCurrentAdoption } from '../api/currentAdoptions';
import '../styles/UpdateCurrentAdoptionForm.css'; // CSS dosyasını import et

const UpdateCurrentAdoptionForm = () => {
  const [adoptionId, setAdoptionId] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { animal_id: animalId, adoption_id: adoptionId };
    try {
      await updateCurrentAdoption(adoptionId, updatedData); // Update current adoption
      alert('Current adoption updated successfully!');
      // Reset form
      setAdoptionId('');
      setAnimalId('');
    } catch (err) {
      console.error('Failed to update current adoption:', err);
      setError('Failed to update current adoption: ' + err.message); // Error message
    }
  };

  return (
    <div>
      <h2>Update Current Adoption</h2>
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
          <label>Animal ID:</label>
          <input
            type="text"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Current Adoption</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateCurrentAdoptionForm;
