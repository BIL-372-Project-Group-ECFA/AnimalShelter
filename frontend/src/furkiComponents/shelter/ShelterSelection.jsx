import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axiosInstance from "../../api/axiosInstance";
import "./ShelterSelection.css"; // CSS dosyasını dahil et

const ShelterSelection = () => {
  const { setSelectedShelter } = useContext(AppContext);
  const [shelters, setShelters] = useState([]); // Varsayılan değer: boş dizi
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/shelters") // Backend API çağrısı
      .then((response) => {
        console.log("API response data:", response.data); // Veriyi kontrol et
        if (Array.isArray(response.data)) {
          setShelters(response.data); // Gelen veriyi state'e ata
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching shelters:", error));
  }, []);

  const handleShelterSelection = (shelter) => {
    setSelectedShelter(shelter); // Seçilen barınağı kaydet
    navigate("/manager-dashboard"); // Yönetici ekranına yönlendir
  };

  return (
    <div className="shelter-selection-container">
      <h1 className="page-title">Barınak Seçimi</h1>
      {Array.isArray(shelters) && shelters.length > 0 ? (
        <div className="shelter-list">
          {shelters.map((shelter) => (
            <div key={shelter.shelter_id} className="shelter-item">
              <h3 className="shelter-name">{shelter.location}</h3> 
              <p><strong>Barınak ID:</strong> {shelter.shelter_id}</p>
              <p><strong>Kapasite:</strong> {shelter.capacity}</p>
              <p><strong>Mevcut Hayvan Sayısı:</strong> {shelter.current_animal_count}</p>
              <p><strong>Telefon:</strong> {shelter.phone_number}</p>
              <button
                className="select-button"
                onClick={() => handleShelterSelection(shelter)}
              >
                Seç
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Barınaklar yükleniyor veya bulunamadı...</p>
      )}
    </div>
  );
};

export default ShelterSelection;
