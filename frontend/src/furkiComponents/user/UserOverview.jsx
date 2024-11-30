import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axiosInstance from "../../api/axiosInstance";
import "./UserOverview.css"; // Add CSS for styling if needed

const UserOverview = () => {
  const { userId } = useContext(AppContext); // Get the logged-in user's ID
  const [user, setUser] = useState(null); // State to hold user information
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch user data from the backend
    if (userId) {
      axiosInstance
        .get(`/users/${userId}`) // API endpoint to get user details by ID
        .then((response) => {
          setUser(response.data); // Save the user data
          setLoading(false); // Set loading to false
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setError("Unable to fetch user details.");
          setLoading(false); // Set loading to false
        });
    } else {
      setError("User ID is missing.");
      setLoading(false); // Set loading to false
    }
  }, [userId]);

  // Show loading or error message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Display user information if available
  return (
    <div className="user-overview-container">
      <h3>Kullanıcı Bilgileri</h3>
      {user ? (
        <div>
          <p><strong>Kullanıcı ID:</strong> {user.user_id}</p>
          <p><strong>Kullanıcı Adı:</strong> {user.name}</p>
          <p><strong>Kullanıcı Soyadı:</strong> {user.surname}</p>
          <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
          <p><strong>Kullanıcı Telefon:</strong> {user.contact_number}</p>
          <p><strong>Kullanıcı Adres:</strong> {user.address || "Adres girilmemiş."}</p>
          <p><strong>Kullanıcı Mail:</strong> {user.email}</p>
          <p><strong>Kullanıcı Meslek:</strong> {user.occupation || "Meslek belirtilmemiş."}</p>
        </div>
      ) : (
        <p>No user information found.</p>
      )}
    </div>
  );
};

export default UserOverview;