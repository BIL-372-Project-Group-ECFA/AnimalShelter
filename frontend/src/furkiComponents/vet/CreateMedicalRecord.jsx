import React, { useState } from "react";
import { addMedicalRecord } from "../../api/medicalRecords"; // Replace with the appropriate API function
import "./CreateMedicalRecord.css";

const CreateMedicalRecord = () => {
  const [recordData, setRecordData] = useState({
    animal_id: "",
    check_up_date: "",
    veterinarian_id: "",
    next_check_up_date: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecordData({ ...recordData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (you can extend this as needed)
    if (!recordData.animal_id || !recordData.check_up_date || !recordData.veterinarian_id) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      await addMedicalRecord(recordData);
      setSuccessMessage("Sağlık kaydı başarıyla eklendi!");
      setRecordData({
        animal_id: "",
        check_up_date: "",
        veterinarian_id: "",
        next_check_up_date: "",
      });
    } catch (err) {
      console.error("Failed to add medical record:", err);
      setError("Sağlık kaydı eklenirken bir hata oluştu: " + err.message);
    }
  };

  return (
    <div className="add-medical-record-form">
      <h2>Yeni Sağlık Kaydı Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hayvan ID:</label>
          <input
            type="number"
            name="animal_id"
            value={recordData.animal_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Muayene Tarihi:</label>
          <input
            type="date"
            name="check_up_date"
            value={recordData.check_up_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Veteriner ID:</label>
          <input
            type="number"
            name="veterinarian_id"
            value={recordData.veterinarian_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Sonraki Muayene Tarihi:</label>
          <input
            type="date"
            name="next_check_up_date"
            value={recordData.next_check_up_date}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Kaydet</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default CreateMedicalRecord;
