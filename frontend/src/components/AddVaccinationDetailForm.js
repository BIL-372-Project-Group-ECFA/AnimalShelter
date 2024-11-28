import React, { useState } from 'react';
import { addVaccinationDetail } from '../api/vaccinationDetails';
import '../styles/AddVaccinationDetailForm.css'; // CSS dosyasını import et

const AddVaccinationDetailForm = () => {
  const [animalId, setAnimalId] = useState('');
  const [vaccinationTypeId, setVaccinationTypeId] = useState('');
  const [vaccinationDate, setVaccinationDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vaccinationData = { animal_id: parseInt(animalId), vaccination_type_id: parseInt(vaccinationTypeId), vaccination_date: vaccinationDate };
      await addVaccinationDetail(vaccinationData);
      alert('Vaccination detail added successfully!');
      // Reset form
      setAnimalId('');
      setVaccinationTypeId('');
      setVaccinationDate('');
    } catch (err) {
      alert("Failed to add vaccination detail: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Add Vaccination Detail</h2>
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
          <label>Vaccination Type ID:</label>
          <input
            type="number"
            value={vaccinationTypeId}
            onChange={(e) => setVaccinationTypeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vaccination Date:</label>
          <input
            type="date"
            value={vaccinationDate}
            onChange={(e) => setVaccinationDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Vaccination Detail</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddVaccinationDetailForm;
