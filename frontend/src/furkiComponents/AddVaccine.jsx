import React, { useState } from 'react';
import { addVaccine } from '../api/vaccines';
import './AddVaccine.css'; // CSS dosyasını import et

const AddVaccineForm = () => {
  const [vaccineName, setVaccineName] = useState('');
  const [validityPeriod, setValidityPeriod] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vaccineData = {
        vaccine_name: vaccineName,
        validity_period: parseInt(validityPeriod, 10), // Geçerlilik süresini sayıya dönüştür
      };
      await addVaccine(vaccineData);
      setSuccessMessage('Aşı başarıyla eklendi!');
      setErrorMessage('');
      setVaccineName('');
      setValidityPeriod('');
    } catch (err) {
      setErrorMessage(
        `Aşı eklenirken bir hata oluştu: ${
          err.response?.data?.message || err.message
        }`
      );
      setSuccessMessage('');
    }
  };

  return (
    <div className="add-vaccine-form-container">
      <h2 className="form-title">Yeni Aşı Ekle</h2>
      <form className="add-vaccine-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="vaccineName">Aşı Adı:</label>
          <input
            id="vaccineName"
            type="text"
            value={vaccineName}
            onChange={(e) => setVaccineName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="validityPeriod">Geçerlilik Süresi (Ay):</label>
          <input
            id="validityPeriod"
            type="number"
            value={validityPeriod}
            onChange={(e) => setValidityPeriod(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Aşı Ekle</button>
      </form>
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
    </div>
  );
};

export default AddVaccineForm;
