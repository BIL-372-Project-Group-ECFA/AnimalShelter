import React, { useState } from 'react';
import { updateShelterHistory } from '../api/shelterHistory';
import '../styles/UpdateShelterHistoryForm.css'; // CSS dosyasını import et

const UpdateShelterHistoryForm = () => {
  const [shelterResidenceId, setShelterResidenceId] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { 
      animal_id: parseInt(animalId), 
      shelter_residence_id: parseInt(shelterResidenceId), 
      arrival_date: arrivalDate 
    };

    try {
      await updateShelterHistory(shelterResidenceId, updatedData); // Update shelter history
      alert('Shelter history updated successfully!');
      // Reset form
      setShelterResidenceId('');
      setAnimalId('');
      setArrivalDate('');
    } catch (err) {
      console.error('Failed to update shelter history:', err);
      setError('Failed to update shelter history: ' + (err.response?.data?.message || err.message)); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Update Shelter History</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Shelter Residence ID:</label>
          <input
            type="number"
            value={shelterResidenceId}
            onChange={(e) => setShelterResidenceId(e.target.value)}
            required
          />
        </div>
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
          <label>Arrival Date:</label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Shelter History</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateShelterHistoryForm;
