import React, { useState } from 'react';
import { addMedicalRecord } from '../api/medicalRecords';
import '../styles/AddMedicalRecordForm.css'; // CSS dosyasını import et

const AddMedicalRecordForm = () => {
  const [animalId, setAnimalId] = useState('');
  const [checkUpDate, setCheckUpDate] = useState('');
  const [veterinarianId, setVeterinarianId] = useState('');
  const [nextCheckUpDate, setNextCheckUpDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const medicalRecordData = {
        animal_id: parseInt(animalId),
        check_up_date: checkUpDate,
        veterinarian_id: veterinarianId ? parseInt(veterinarianId) : null,
        next_check_up_date: nextCheckUpDate || null,
      };

      await addMedicalRecord(medicalRecordData);
      alert('Medical record added successfully!');
      // Reset form
      setAnimalId('');
      setCheckUpDate('');
      setVeterinarianId('');
      setNextCheckUpDate('');
    } catch (err) {
      alert('Failed to add medical record: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Add Medical Record</h2>
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
          <label>Check-up Date:</label>
          <input
            type="date"
            value={checkUpDate}
            onChange={(e) => setCheckUpDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Veterinarian ID (optional):</label>
          <input
            type="number"
            value={veterinarianId}
            onChange={(e) => setVeterinarianId(e.target.value)}
          />
        </div>
        <div>
          <label>Next Check-up Date (optional):</label>
          <input
            type="date"
            value={nextCheckUpDate}
            onChange={(e) => setNextCheckUpDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Medical Record</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddMedicalRecordForm;
