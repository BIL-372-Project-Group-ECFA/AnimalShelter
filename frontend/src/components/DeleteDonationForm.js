import React, { useState } from 'react';
import { deleteDonation } from '../api/donations';
import '../styles/DeleteDonationForm.css'; // CSS dosyasını import et

const DeleteDonationForm = () => {
  const [donationId, setDonationId] = useState('');
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDonation(donationId); // Donation silme işlemi
      alert('Donation deleted successfully!');
      setDonationId(''); // Formu resetle
    } catch (err) {
      console.error('Failed to delete donation:', err);
      setError('Failed to delete donation: ' + (err.response?.data?.message || err.message)); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Delete Donation</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Donation ID:</label>
          <input
            type="text"
            value={donationId}
            onChange={(e) => setDonationId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Donation</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteDonationForm;
