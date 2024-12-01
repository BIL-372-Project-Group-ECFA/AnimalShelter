import React, { useState } from 'react';
import { addShelter } from '../../api/shelters'; // API'yi import edin
import './AddShelter.css'; // CSS dosyasını import edin

const AddShelter = () => {
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [currentAnimalCount, setCurrentAnimalCount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // Başarı mesajı state'i

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
      setSuccessMessage('Barınak başarıyla eklendi!'); // Başarı mesajını göster
      // Formu sıfırla
      setLocation('');
      setCapacity('');
      setCurrentAnimalCount(0);
      setPhoneNumber('');
    } catch (err) {
      setError('Barınak eklenirken bir hata oluştu: ' + (err.response?.data?.message || err.message));
      setSuccessMessage(''); // Başarı mesajını sıfırla
    }
  };

  return (
    <div className="add-shelter-form-container">
      <h2 className="form-title">Yeni Barınak Ekle</h2>
      <form className="add-shelter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input
            id="capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Add Shelter</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>} {/* Başarı mesajı göster */}
      {error && <p className="error-message">{error}</p>} {/* Hata mesajı göster */}
    </div>
  );
};

export default AddShelter;
