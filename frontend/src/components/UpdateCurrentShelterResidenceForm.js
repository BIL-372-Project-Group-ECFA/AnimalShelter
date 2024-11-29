import React, { useState } from 'react';
import { updateCurrentShelterResidence } from '../api/currentShelterResidence';
import '../styles/UpdateCurrentShelterResidenceForm.css'; // CSS dosyasını import et

const UpdateCurrentShelterResidenceForm = () => {
  const [animalId, setAnimalId] = useState('');
  const [shelterResidenceId, setShelterResidenceId] = useState('');
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { animal_id: parseInt(animalId), shelter_residence_id: parseInt(shelterResidenceId) };

    try {
      await updateCurrentShelterResidence(animalId, updatedData); // Update current shelter residence
      alert('Current shelter residence updated successfully!');
      // Reset form
      setAnimalId('');
      setShelterResidenceId('');
    } catch (err) {
      console.error('Failed to update current shelter residence:', err);
      setError('Failed to update current shelter residence: ' + (err.response?.data?.message || err.message)); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Update Current Shelter Residence</h2>
      <form onSubmit={handleUpdate}>
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
          <label>Shelter Residence ID:</label>
          <input
            type="number"
            value={shelterResidenceId}
            onChange={(e) => setShelterResidenceId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Current Shelter Residence</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateCurrentShelterResidenceForm;
