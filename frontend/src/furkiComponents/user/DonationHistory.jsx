import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext"; // Assuming you have context to get the user ID
import axiosInstance from "../../api/axiosInstance";
import "./DonationHistory.css";

const DonationHistory = () => {
  const { userId } = useContext(AppContext); // Getting user ID from context
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch donation history on component mount
  useEffect(() => {
    if (!userId) {
      setError("Kullanıcı giriş yapmamış.");
      setLoading(false);
      return;
    }

    axiosInstance
      .get(`/donations/donor/${userId}`) // Endpoint to get donations by user ID
      .then((response) => {
        setDonations(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donation history:", err);
        setError("Bağış geçmişi yüklenirken hata oluştu.");
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="donation-history-container">
      <h3>Bağış Geçmişiniz</h3>

      {donations.length === 0 ? (
        <p>Henüz bir bağış yapmadınız.</p>
      ) : (
        <table className="donation-history-table">
          <thead>
            <tr>
              <th>Barınak</th>
              <th>Miktar (TL)</th>
              <th>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.donation_id}>
                <td>{donation.shelter.location}</td>
                <td>{donation.amount}</td>
                <td>{donation.donation_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonationHistory;
