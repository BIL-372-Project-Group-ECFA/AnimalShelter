import React, { useState } from 'react';
import { addShelter } from '../api/shelters';
import '../styles/AddShelterForm.css'; // CSS dosyasını import et

const AddShelterForm = () => {
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [currentAnimalCount, setCurrentAnimalCount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const shelterData = {
        location,
        capacity: parseInt(capacity),
        current_animal_count: parseInt(currentAnimalCount),
        phone_number: phoneNumber,
      };
      await addShelter(shelterData);
      alert('Shelter added successfully!');
      // Reset form
      setLocation('');
      setCapacity('');
      setCurrentAnimalCount('');
      setPhoneNumber('');
    } catch (err) {
      alert("Failed to add shelter: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Add Shelter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Current Animal Count:</label>
          <input
            type="number"
            value={currentAnimalCount}
            onChange={(e) => setCurrentAnimalCount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Shelter</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddShelterForm;
