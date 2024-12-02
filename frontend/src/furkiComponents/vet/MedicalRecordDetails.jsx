import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // Adjust the path to your axios instance
import "./MedicalRecordDetails.css";

const MedicalRecordDetails = ({ animalId }) => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the medical records for the animal when the component mounts
    if (animalId) {
      axiosInstance
        .get(`/medicalRecords/${animalId}/medical-records`) // Adjust the endpoint to match your backend API
        .then((response) => {
          if (response.data && response.data.records) {
            setMedicalRecords(response.data.records); // Store the records in state
          } else {
            setError("No medical records found for this animal.");
          }
        })
        .catch((err) => {
          console.error("Error fetching medical records:", err);
          setError("There was an error fetching the medical records.");
        });
    }
  }, [animalId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Medical Records for Animal ID: {animalId}</h2>
      {medicalRecords.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Check-up Date</th>
              <th>Veterinarian</th>
              <th>Next Check-up Date</th>
            </tr>
          </thead>
          <tbody>
            {medicalRecords.map((record) => (
              <tr key={record.record_id}>
                <td>{record.check_up_date}</td>
                <td>{record.veterinarian_id || "Not Assigned"}</td>
                <td>{record.next_check_up_date || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medical records available for this animal.</p>
      )}
    </div>
  );
};

export default MedicalRecordDetails;
