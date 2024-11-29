import React, { useState } from 'react';
import { updateMedicalRecord } from '../api/medicalRecords';
import '../styles/UpdateMedicalRecordForm.css'; // CSS dosyasını import et

const UpdateMedicalRecordForm = () => {
  const [recordId, setRecordId] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [checkUpDate, setCheckUpDate] = useState('');
  const [veterinarianId, setVeterinarianId] = useState('');
  const [nextCheckUpDate, setNextCheckUpDate] = useState('');
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      animal_id: parseInt(animalId),
      check_up_date: checkUpDate,
      veterinarian_id: parseInt(veterinarianId),
      next_check_up_date: nextCheckUpDate || null,
    };

    try {
      await updateMedicalRecord(recordId, updatedData); // Update medical record
      alert('Medical record updated successfully!');
      // Reset form
      setRecordId('');
      setAnimalId('');
      setCheckUpDate('');
      setVeterinarianId('');
      setNextCheckUpDate('');
    } catch (err) {
      console.error('Failed to update medical record:', err);
      setError('Failed to update medical record: ' + (err.response?.data?.message || err.message)); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Update Medical Record</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Record ID:</label>
          <input
            type="text"
            value={recordId}
            onChange={(e) => setRecordId(e.target.value)}
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
          <label>Check-Up Date:</label>
          <input
            type="date"
            value={checkUpDate}
            onChange={(e) => setCheckUpDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Veterinarian ID:</label>
          <input
            type="number"
            value={veterinarianId}
            onChange={(e) => setVeterinarianId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Next Check-Up Date (optional):</label>
          <input
            type="date"
            value={nextCheckUpDate}
            onChange={(e) => setNextCheckUpDate(e.target.value)}
          />
        </div>
        <button type="submit">Update Medical Record</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateMedicalRecordForm;
