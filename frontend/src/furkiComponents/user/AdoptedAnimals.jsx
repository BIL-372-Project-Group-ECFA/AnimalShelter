import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
//import axios from "axios"; // Axios ile API çağrısı yapacağız
import axiosInstance from "../../api/axiosInstance";
import Modal from "../Modal";

const AdoptedAnimals = () => {
  const { userId } = useContext(AppContext); // User ID'yi context'ten alıyoruz
  const [animals, setAnimals] = useState([]); // Sahiplenilen hayvanlar için state
  const [loading, setLoading] = useState(true); // Yükleniyor durumu
  const [error, setError] = useState(""); // Hata durumu
  const [selectedAnimalPhoto, setSelectedAnimalPhoto] = useState(null); // Fotoğraf detayı için seçilen hayvan
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false); // Fotoğraf modal'ı açık/kapalı durumu
  const [selectedAnimalVaccinations, setSelectedAnimalVaccinations] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal açık/kapalı durumu

  useEffect(() => {
    const fetchAdoptedAnimals = async () => {
      try {
        // 1. adopter_id ile adoption-history'yi sorgula
        
        const adoptionHistoryResponse = await axiosInstance.get(`/adoption-history/user/${userId}`);
        console.log(adoptionHistoryResponse.data);
        const animalIds = adoptionHistoryResponse.data.currentAdoptions.map(adopt => adopt.animal_id);
        console.log(animalIds);
        // 2. animal_id ile animals'ı sorgula

        const animalIdsQueryString = animalIds.join(',');

        let animalsResponse = [];

        if(animalIds.length > 0) {
            animalsResponse = await axiosInstance.get('/animals/getSpecificAnimals', {
              params: { animal_ids: animalIdsQueryString }
            });
        }
        
        console.log("-------------------");
        if(animalIds.length > 0) {
          console.log(animalsResponse.data);
        }
        // Sahiplenilen hayvanları state'e set et
        if(animalIds.length > 0) {
          setAnimals(animalsResponse.data);
        }
        else {
          setAnimals([]);
        }
      } catch (err) {
        setError("Hayvanlar alınırken bir hata oluştu");
        console.error(err);
      } finally {
        setLoading(false); // Yükleme bitti
      }
    };

    // Eğer userId varsa, verileri çek
    if (userId) {
      fetchAdoptedAnimals();
    }
  }, [userId]); // userId değiştikçe API çağrısı yapılır

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const bufferToBlob = (buffer) => {
    return new Blob([new Uint8Array(buffer)], { type: 'image/jpeg' }); // İmaj türünü doğru belirlediğinizden emin olun
  };
  
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  const handlePhotoDetails = async (animalId) => {
    try {
      const response = await axiosInstance.get(`/animals/${animalId}`);
      const bufferPhoto = response.data.photo
  
      if (!bufferPhoto) {
        alert("Bu hayvanın fotoğrafı bulunmamaktadır.");
        return;
      }
  
      // Buffer'ı Blob'a dönüştür
      const photoBlob = bufferToBlob(bufferPhoto.data);
  
      // Blob'u Base64'e çevir
      const base64Photo = await convertBlobToBase64(photoBlob);
  
      // Fotoğrafı state'e ekle ve modal'ı aç
      setSelectedAnimalPhoto(base64Photo);
      setIsPhotoModalOpen(true);
    } catch (err) {
      console.error("Fotoğraf detayları alınırken bir hata oluştu:", err);
      alert("Fotoğraf detayları alınamadı.");
      setSelectedAnimalPhoto(null);
    }
  };
  // Fotoğraf modal'ını kapatmak için
  const closePhotoModal = () => {
    setSelectedAnimalPhoto(null);
    setIsPhotoModalOpen(false);
  };
  const handleVaccinationDetails = (animalId) => {
    axiosInstance
      .get(`/shelters/last-vaccinations/${animalId}`)
      .then((response) => {
        setSelectedAnimalVaccinations(response.data.vaccinations || []);
        setIsModalOpen(true); // Modal'ı aç
      })
      .catch((err) => {
        console.error("Aşı detayları alınırken bir hata oluştu:", err);
        setSelectedAnimalVaccinations([]);
      });
  };
  const closeModal = () => {
    setIsModalOpen(false); // Modal'ı kapat
    setSelectedAnimalVaccinations([]); // Aşı bilgilerini sıfırla
  };
  
  return (
    <div>
      <h3>Sahiplenilen Hayvanlar</h3>
      {animals.length > 0 ? (
        <ul className="list">
          {animals.map((animal) => (
            <li key={animal.animal_id} className="list-item">
              <strong>Adı:</strong> {animal.name} <br />
              <strong>Türü:</strong> {animal.species} <br />
              <strong>Yaşı:</strong> {animal.age}
              <button
                    onClick={() => handleVaccinationDetails(animal.animal_id)}
                  >
                    Aşı Detayları
                  </button>
              <button onClick={() => handlePhotoDetails(animal.animal_id)}>Fotoğraf Gör</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Henüz sahiplenilen bir hayvan bulunmamaktadır.</p>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Aşı Detayları">
        {selectedAnimalVaccinations && selectedAnimalVaccinations.length > 0 ? (
          <ul>
            {selectedAnimalVaccinations.map((vaccination) => (
              <li key={vaccination.vaccine_id}>
                <strong>Aşı Tipi:</strong> {vaccination.vaccine_name} <br />
                <strong>Son Aşı Tarihi:</strong>{" "}
                {vaccination.last_vaccination_date || "Hiç yapılmadı"}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aşı bilgisi bulunmamaktadır.</p>
        )}
      </Modal>
      <Modal isOpen={isPhotoModalOpen} onClose={closePhotoModal} title="">
        {selectedAnimalPhoto ? (
          <div>
            <img
              src={selectedAnimalPhoto || "https://via.placeholder.com/150"}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </div>
        ) : (
          <p>Hayvan fotoğrafı bulunamadı.</p>
        )}
      </Modal>
    </div>
  );
};

export default AdoptedAnimals;
