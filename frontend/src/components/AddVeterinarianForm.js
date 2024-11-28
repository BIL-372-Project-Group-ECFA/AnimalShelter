import React, { useState } from 'react';
import { addVeterinarian } from '../api/veterinarians';
import '../styles/AddVeterinarianForm.css'; // CSS dosyasını import et

const AddVeterinarianForm = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const veterinarianData = { name, contactNumber, licenseNumber, specialization };
      await addVeterinarian(veterinarianData);
      alert('Veterinarian added successfully!');
      // Reset form
      setName('');
      setContactNumber('');
      setLicenseNumber('');
      setSpecialization('');
    } catch (err) {
      alert("Failed to add veterinarian: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Add Veterinarian</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>License Number:</label>
          <input
            type="text"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Specialization:</label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </div>
        <button type="submit">Add Veterinarian</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddVeterinarianForm;
