import React, { useState } from 'react';
import { addDonation } from '../api/donations';
import '../styles/AddDonationForm.css'; // CSS dosyasını import et

const AddDonationForm = () => {
  const [shelterId, setShelterId] = useState('');
  const [donorId, setDonorId] = useState('');
  const [amount, setAmount] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const donationData = {
        shelter_id: shelterId ? parseInt(shelterId) : null,
        donor_id: donorId ? parseInt(donorId) : null,
        amount: parseFloat(amount),
        donation_date: donationDate
      };
      await addDonation(donationData);
      alert('Donation added successfully!');
      // Reset form
      setShelterId('');
      setDonorId('');
      setAmount('');
      setDonationDate('');
    } catch (err) {
      alert('Failed to add donation: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Add Donation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Shelter ID:</label>
          <input
            type="number"
            value={shelterId}
            onChange={(e) => setShelterId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Donor ID:</label>
          <input
            type="number"
            value={donorId}
            onChange={(e) => setDonorId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Donation Date:</label>
          <input
            type="date"
            value={donationDate}
            onChange={(e) => setDonationDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Donation</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddDonationForm;
