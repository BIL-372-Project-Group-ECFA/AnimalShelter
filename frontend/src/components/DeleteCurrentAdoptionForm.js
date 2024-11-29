import React, { useState } from 'react';
import { deleteCurrentAdoption } from '../api/currentAdoptions';
import '../styles/DeleteCurrentAdoptionForm.css'; // CSS dosyasını import et

const DeleteCurrentAdoptionForm = () => {
  const [currentAdoptionId, setCurrentAdoptionId] = useState('');
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteCurrentAdoption(currentAdoptionId); // Current adoption silme işlemi
      alert('Current adoption deleted successfully!');
      setCurrentAdoptionId(''); // Formu resetle
    } catch (err) {
      console.error('Failed to delete current adoption:', err);
      setError('Failed to delete current adoption: ' + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Delete Current Adoption</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Current Adoption ID:</label>
          <input
            type="text"
            value={currentAdoptionId}
            onChange={(e) => setCurrentAdoptionId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Current Adoption</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteCurrentAdoptionForm;
