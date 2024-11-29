import React, { useState } from 'react';
import { deleteMedicalRecord } from '../api/medicalRecords';
import '../styles/DeleteMedicalRecordForm.css'; // CSS dosyasını import et

const DeleteMedicalRecordForm = () => {
  const [recordId, setRecordId] = useState('');
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteMedicalRecord(recordId); // Medical record silme işlemi
      alert('Medical record deleted successfully!');
      setRecordId(''); // Formu resetle
    } catch (err) {
      console.error('Failed to delete medical record:', err);
      setError('Failed to delete medical record: ' + (err.response?.data?.message || err.message)); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Delete Medical Record</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Record ID:</label>
          <input
            type="text"
            value={recordId}
            onChange={(e) => setRecordId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Medical Record</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteMedicalRecordForm;
