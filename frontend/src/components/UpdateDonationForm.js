import React, { useState } from "react";
import { updateDonation } from "../api/donations";
import "../styles/UpdateDonationForm.css"; // CSS dosyasını import et

const UpdateDonationForm = () => {
  const [donationId, setDonationId] = useState("");
  const [amount, setAmount] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [donorId, setDonorId] = useState("");
  const [shelterId, setShelterId] = useState("");
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      amount: parseFloat(amount),
      donation_date: donationDate,
      donor_id: parseInt(donorId),
      shelter_id: parseInt(shelterId),
    };

    try {
      await updateDonation(donationId, updatedData);
      alert("Donation updated successfully!");
      // Reset form
      setDonationId("");
      setAmount("");
      setDonationDate("");
      setDonorId("");
      setShelterId("");
    } catch (err) {
      console.error("Failed to update donation:", err);
      setError("Failed to update donation: " + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Update Donation</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Donation ID:</label>
          <input
            type="text"
            value={donationId}
            onChange={(e) => setDonationId(e.target.value)}
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
          <label>Shelter ID:</label>
          <input
            type="number"
            value={shelterId}
            onChange={(e) => setShelterId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Donation</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateDonationForm;
