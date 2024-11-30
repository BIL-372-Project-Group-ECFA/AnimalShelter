import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";  // Assuming you have context to get the user ID
import axiosInstance from "../../api/axiosInstance";
import "./MakeDonations.css";

const MakeDonations = () => {
  const { userId } = useContext(AppContext); // Getting user ID from context
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [message, setMessage] = useState("");

  // Fetch shelters from the database on component mount
  useEffect(() => {
    axiosInstance
      .get("/shelters")  // Endpoint to get all shelters
      .then((response) => {
        setShelters(response.data);  // Assuming response.data contains a list of shelters
      })
      .catch((error) => {
        console.error("Error fetching shelters:", error);
      });
  }, []);

  // Handle form submission
  const handleDonationSubmit = () => {
    if (!selectedShelter || !donationAmount || !userId) {
      alert("Please select a shelter, enter a valid donation amount, and ensure you are logged in.");
      return;
    }

    const donationData = {
      shelter_id: selectedShelter,
      donor_id: userId, // Using the logged-in user ID for the donation
      amount: parseFloat(donationAmount),
      donation_date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    };

    axiosInstance
      .post("/donations", donationData)  // Endpoint to make a donation
      .then((response) => {
        setMessage(`Bağış yaptığınız için teşekkürler ${donationAmount}TL!`);
        setSelectedShelter("");
        setDonationAmount("");
      })
      .catch((error) => {
        console.error("Error submitting donation:", error);
        setMessage("There was an error processing your donation. Please try again.");
      });
  };

  return (
    <div className="make-donations-container">
      <h3>Bağış Yap</h3>

      {/* Shelter Selection */}
      <div className="form-group">
        <label htmlFor="shelterSelect">Barınak Seçiniz:</label>
        <select
          id="shelterSelect"
          value={selectedShelter}
          onChange={(e) => setSelectedShelter(e.target.value)}
        >
          <option value="">-- Barınak Seçiniz --</option>
          {shelters.map((shelter) => (
            <option key={shelter.shelter_id} value={shelter.shelter_id}>
              {shelter.location}
            </option>
          ))}
        </select>
      </div>

      {/* Donation Amount */}
      <div className="form-group">
        <label htmlFor="donationAmount">Bağışlanacak Miktar:</label>
        <input
          type="number"
          id="donationAmount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          min="1"
          placeholder="Miktar Giriniz"
        />
      </div>

      {/* Submit Button */}
      <button className="donate-button" onClick={handleDonationSubmit}>
        Bağışı Onayla
      </button>

      {/* Thank You Message */}
      {message && <p className="donation-message">{message}</p>}
    </div>
  );
};

export default MakeDonations;
