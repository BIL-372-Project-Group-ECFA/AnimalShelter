import React, { useState } from 'react';
import { deleteCurrentShelterResidence } from '../api/currentShelterResidence';
import '../styles/DeleteCurrentShelterResidenceForm.css'; // CSS dosyasını import et

const DeleteCurrentShelterResidenceForm = () => {
  const [animalId, setAnimalId] = useState('');
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteCurrentShelterResidence(animalId); // Current shelter residence silme işlemi
      alert('Current shelter residence deleted successfully!');
      setAnimalId(''); // Formu resetle
    } catch (err) {
      console.error('Failed to delete current shelter residence:', err);
      setError('Failed to delete current shelter residence: ' + (err.response?.data?.message || err.message)); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Delete Current Shelter Residence</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Animal ID:</label>
          <input
            type="text"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Current Shelter Residence</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteCurrentShelterResidenceForm;
