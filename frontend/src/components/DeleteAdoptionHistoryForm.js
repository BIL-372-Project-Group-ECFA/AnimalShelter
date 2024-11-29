import React, { useState } from 'react';
import { deleteAdoptionHistory } from '../api/adoptionHistory';  // API'den import et
import '../styles/DeleteAdoptionHistoryForm.css'; // CSS dosyasını import et

const DeleteAdoptionHistoryForm = () => {
  const [adoptionId, setAdoptionId] = useState('');  // Kullanıcıdan alınacak ID
  const [error, setError] = useState(null);  // Hata durumunu tutacak state

  const handleDelete = async (e) => {
    e.preventDefault();  // Formun sayfayı yenilemesini engelle
    try {
      await deleteAdoptionHistory(adoptionId);  // Aşılama geçmişi silme API çağrısı
      alert('Adoption history deleted successfully!');  // Başarılı silme mesajı
      setAdoptionId('');  // Formu sıfırla
    } catch (err) {
      console.error('Failed to delete adoption history:', err);
      setError('Failed to delete adoption history: ' + err.message);  // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Delete Adoption History</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Adoption ID:</label>
          <input
            type="number"
            value={adoptionId}
            onChange={(e) => setAdoptionId(e.target.value)}  // ID değişimini takip et
            required
          />
        </div>
        <button type="submit">Delete Adoption History</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Hata varsa mesajı göster */}
      </form>
    </div>
  );
};

export default DeleteAdoptionHistoryForm;
