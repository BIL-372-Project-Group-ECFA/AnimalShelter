import React, { useState } from 'react';
import { deleteVaccinationDetail } from '../api/vaccinationDetails';  // API'den import et
import '../styles/DeleteVaccinationDetailForm.css'; // CSS dosyasını import et

const DeleteVaccinationDetailForm = () => {
  const [vaccinationId, setVaccinationId] = useState('');  // Kullanıcıdan alınacak ID
  const [error, setError] = useState(null);  // Hata durumunu tutacak state

  const handleDelete = async (e) => {
    e.preventDefault();  // Formun sayfayı yenilemesini engelle
    try {
      await deleteVaccinationDetail(vaccinationId);  // Aşılama detayını silme API çağrısı
      alert('Vaccination detail deleted successfully!');  // Başarılı silme mesajı
      setVaccinationId('');  // Formu sıfırla
    } catch (err) {
      console.error('Failed to delete vaccination detail:', err);
      setError('Failed to delete vaccination detail: ' + err.message);  // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Delete Vaccination Detail</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Vaccination ID:</label>
          <input
            type="number"
            value={vaccinationId}
            onChange={(e) => setVaccinationId(e.target.value)}  // ID değişimini takip et
            required
          />
        </div>
        <button type="submit">Delete Vaccination Detail</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Hata varsa mesajı göster */}
      </form>
    </div>
  );
};

export default DeleteVaccinationDetailForm;
