import React, { useState } from 'react';
import { deleteShelterHistory } from '../api/shelterHistory';
import '../styles/DeleteShelterHistoryForm.css'; // CSS dosyasını import et

const DeleteShelterHistoryForm = () => {
  const [shelterResidenceId, setShelterResidenceId] = useState('');
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteShelterHistory(shelterResidenceId); // Shelter history silme işlemi
      alert('Shelter history deleted successfully!');
      setShelterResidenceId(''); // Formu resetle
    } catch (err) {
      console.error('Failed to delete shelter history:', err);
      setError('Failed to delete shelter history: ' + (err.response?.data?.message || err.message)); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Delete Shelter History</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Shelter Residence ID:</label>
          <input
            type="text"
            value={shelterResidenceId}
            onChange={(e) => setShelterResidenceId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Shelter History</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteShelterHistoryForm;
