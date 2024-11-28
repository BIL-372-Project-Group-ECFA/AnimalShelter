import React, { useState } from 'react';
import { addVaccine } from '../api/vaccines';
import '../styles/AddVaccineForm.css'; // CSS dosyasını import et

const AddVaccineForm = () => {
  const [vaccineName, setVaccineName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vaccineData = { vaccine_name: vaccineName };
      await addVaccine(vaccineData);
      alert('Vaccine added successfully!');
      // Reset form
      setVaccineName('');
    } catch (err) {
      alert("Failed to add vaccine: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Add Vaccine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vaccine Name:</label>
          <input
            type="text"
            value={vaccineName}
            onChange={(e) => setVaccineName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Vaccine</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddVaccineForm;
