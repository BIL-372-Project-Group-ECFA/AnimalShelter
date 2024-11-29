import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axiosInstance from "../../api/axiosInstance";

const ShelterSelection = () => {
  const { setSelectedShelter } = useContext(AppContext);
  const [shelters, setShelters] = useState([]); // Varsayılan değer: boş dizi
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/shelters') // Backend API çağrısı
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
    <div>
      <h1>Barınak Seçimi</h1>
      {Array.isArray(shelters) && shelters.length > 0 ? (
        <ul>
          {shelters.map((shelter) => (
            <li key={shelter.shelter_id}>
              <strong>Barınak ID:</strong> {shelter.shelter_id} <br />
              <strong>Konum:</strong> {shelter.location} <br />
              <strong>Kapasite:</strong> {shelter.capacity} <br />
              <strong>Mevcut Hayvan Sayısı:</strong> {shelter.current_animal_count} <br />
              <strong>Telefon:</strong> {shelter.phone_number} <br />
              <button onClick={() => handleShelterSelection(shelter)}>Seç</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Barınaklar yükleniyor veya bulunamadı...</p>
      )}
    </div>
  );
};

export default ShelterSelection;
