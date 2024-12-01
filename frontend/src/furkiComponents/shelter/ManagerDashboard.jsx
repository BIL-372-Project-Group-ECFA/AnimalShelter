import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axiosInstance from "../../api/axiosInstance";
import Modal from "../Modal";
import "./ManagerDashboard.css";


const ManagerDashboard = () => {
  const { selectedShelter } = useContext(AppContext);
  const [animals, setAnimals] = useState([]); // Shelter'daki hayvanlar
  const [strayAnimals, setStrayAnimals] = useState([]); // Başıboş hayvanlar
  const [view, setView] = useState("overview"); // Görünüm durumu
  const [error, setError] = useState(null); // Hata durumu
  const [arrivalDate, setArrivalDate] = useState(""); // Seçilen tarih
  const [expiredVaccinations, setExpiredVaccinations] = useState([]); // Aşı bilgileri
  const [selectedVaccinations, setSelectedVaccinations] = useState([]); // Seçilen aşılar
  const [selectedAnimalVaccinations, setSelectedAnimalVaccinations] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal açık/kapalı durumu
  const [selectedAnimalPhoto, setSelectedAnimalPhoto] = useState(null); // Fotoğraf detayı için seçilen hayvan
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false); // Fotoğraf modal'ı açık/kapalı durumu

  // Shelter'daki hayvanları yükle
  useEffect(() => {
    if (selectedShelter) {
      axiosInstance
        .get(`/shelters/${selectedShelter.shelter_id}/current-animals`)
        .then((response) => {
          if (response.data && response.data.animals) {
            setAnimals(response.data.animals); // Hayvanları state'e ekle
          } else {
            console.error("Unexpected data format:", response.data);
            setError("Hayvan bilgileri yüklenirken bir hata oluştu.");
          }
        })
        .catch((err) => {
          console.error("Error fetching shelter animals:", err);
          setError("Hayvan bilgileri yüklenirken bir hata oluştu.");
        });
    }
  }, [selectedShelter]);

  // Başıboş hayvanları yükle
  useEffect(() => {
    if (view === "strayAnimals") {
      axiosInstance
        .get("/shelters/stray-animals")
        .then((response) => {
          if (response.data && Array.isArray(response.data)) {
            setStrayAnimals(response.data); // Başıboş hayvanları state'e ekle
          } else {
            console.error("Unexpected stray animals data format:", response.data);
            setError("Başıboş hayvan bilgileri yüklenirken bir hata oluştu.");
          }
        })
        .catch((err) => {
          console.error("Error fetching stray animals:", err);
          setError("Başıboş hayvan bilgileri yüklenirken bir hata oluştu.");
        });
    }
  }, [view]); // Sadece "strayAnimals" görünüme geçildiğinde çalışır

  const handleDateChange = (e) => {
    setArrivalDate(e.target.value); // Tarihi state'e kaydet
  };

  const fetchExpiredVaccinations = () => {
    if (!arrivalDate) {
      alert("Lütfen bir tarih seçiniz.");
      return;
    }

    axiosInstance
      .post(`/shelters/${selectedShelter.shelter_id}/expired-vaccinations`, {
        selectedDate: arrivalDate,
      })
      .then((response) => {
        setExpiredVaccinations(response.data.results || []); // Aşı bilgilerini state'e ekle
      })
      .catch((err) => {
        console.error("Error fetching expired vaccinations:", err);
        setError("Aşı bilgileri yüklenirken bir hata oluştu.");
      });
  };

  const toggleVaccinationSelection = (animalId, vaccineId, vaccineName) => {
    const key = `${animalId}-${vaccineId}-${vaccineName}`;
    setSelectedVaccinations((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key) // Seçimlerden çıkar
        : [...prev, key] // Seçimlere ekle
    );
  };

  const handleVaccinationSubmission = () => {
    if (selectedVaccinations.length === 0) {
      alert("Hiçbir aşı seçilmedi.");
      return;
    }

    // Seçilen aşıları uygun bir formata dönüştür
    const vaccinationData = selectedVaccinations.map((selection) => {
      const [animalId, vaccineId, vaccineName] = selection.split("-");
      return {
        animal_id: parseInt(animalId, 10),
        vaccine_id: parseInt(vaccineId, 10),
        vaccine_name: vaccineName,
        vaccination_date: arrivalDate, // Seçilen tarih
      };
    });

    // Backend'e POST isteği at
    axiosInstance
      .post(`/shelters/${selectedShelter.shelter_id}/add-vaccinations`, vaccinationData)
      .then(() => {
        alert("Aşılar başarıyla kaydedildi!");
        setSelectedVaccinations([]); // Seçimleri sıfırla
      })
      .catch((err) => {
        console.error("Error submitting vaccinations:", err);
        setError("Aşılar kaydedilirken bir hata oluştu.");
      });
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

  const addAnimalToShelter = (animal) => {
    if (!arrivalDate) {
      alert("Lütfen bir tarih seçiniz.");
      return;
    }

    axiosInstance
      .post(`/shelters/${selectedShelter.shelter_id}/add-animal`, {
        animal_id: animal.animal_id,
        arrival_date: arrivalDate, // O anki tarihi gönderiyoruz
      })
      .then(() => {
        // İstek başarılı olduğunda state güncelle
        setStrayAnimals((prev) => prev.filter((a) => a.animal_id !== animal.animal_id));
        setAnimals((prev) => [...prev, animal]);
      })
      .catch((err) => {
        console.error("Error adding animal to shelter:", err);
        setError("Hayvan barınağa eklenirken bir hata oluştu.");
      });
  };

  if (!selectedShelter) {
    return <p>Bir barınak seçilmedi. Lütfen önce bir barınak seçin.</p>;
  }

  return (
    <div className="container">
      <h1 className="title">BARINAK YÖNETİCİ PANELİ</h1>
      <div className="shelter-info">
      <h2>{selectedShelter.location.toLowerCase('tr').split(' ').map(word => word.charAt(0).toLocaleUpperCase('tr') + word.slice(1)).join(' ')}</h2>

        <p>
          <strong>Kapasite:</strong> {selectedShelter.capacity}
        </p>
        <p>
          <strong>Mevcut Hayvan Sayısı:</strong> {animals.length}
        </p>
        <p>
          <strong>Telefon:</strong> {selectedShelter.phone_number}
        </p>
      </div>

      <div className="buttons">
        

        <button
          onClick={() => setView("overview")}
          className={view === "overview" ? "active" : ""}
        >
          Genel Bakış
        </button>
        

        <button
          onClick={() => setView("strayAnimals")}
          className={view === "strayAnimals" ? "active" : ""}
        >
          Başıboş Hayvanlar
        </button>
        <button
          onClick={() => setView("shelterAnimals")}
          className={view === "shelterAnimals" ? "active" : ""}
        >
          Barınaktaki Hayvanlar
        </button>
        <button
          onClick={() => setView("vaccinations")}
          className={view === "vaccinations" ? "active" : ""}
        >
          Aşılar
        </button>
      </div>

      {view === "overview" && (
        <div>
          <h3>Genel Bilgiler</h3>
          <p>Bu panelde barınağınızla ilgili işlemleri yönetebilirsiniz.</p>
        </div>
      )}

      {view === "strayAnimals" && (
        <div>
          <h3>Başıboş Hayvanlar</h3>
          <div>
            <label htmlFor="arrivalDate">
              <strong>Varış Tarihi:</strong>
            </label>
            <input
              type="date"
              id="arrivalDate"
              value={arrivalDate}
              onChange={handleDateChange}
            />
          </div>
          {error ? (
            <p className="error">{error}</p>
          ) : strayAnimals.length > 0 ? (
            <ul className="list">
              {strayAnimals.map((animal) => (
                <li key={animal.animal_id} className="list-item">
                  <strong>Adı:</strong> {animal.name} <br />
                  <strong>Türü:</strong> {animal.species} <br />
                  <strong>Yaşı:</strong> {animal.age} <br />
                  <button onClick={() => addAnimalToShelter(animal)}>Barınağa Ekle</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Başıboş hayvan bulunmamaktadır.</p>
          )}
        </div>
      )}

      {view === "shelterAnimals" && (
         <div>
          <h3>Barınaktaki Hayvanlar</h3>
          {animals.length > 0 ? (
            <ul className="list">
              {animals.map((animal) => (
                <li key={animal.animal_id} className="list-item">
                  <strong>Adı:</strong> {animal.name} <br />
                  <strong>Türü:</strong> {animal.species} <br />
                  <strong>Yaşı:</strong> {animal.age} <br />
                  {/* Aşı Detayları Butonu */}
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
            <p>Barınakta hayvan bulunmamaktadır.</p>
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
      )}

      {view === "vaccinations" && (
        <div>
          <h3>Aşılar</h3>
          <div>
            <label htmlFor="vaccinationDate">
              <strong>Aşı Tarihi:</strong>
            </label>
            <input
              type="date"
              id="vaccinationDate"
              value={arrivalDate}
              onChange={handleDateChange}
            />
            <button onClick={fetchExpiredVaccinations}>Listele</button>
          </div>
          {expiredVaccinations.length > 0 ? (
            <ul className="list">
              {expiredVaccinations.map((animal) => (
                <li key={animal.animal_id}>
                  <strong>{animal.name}</strong> ({animal.species}, {animal.age} yaşında)
                  <ul>
                    {animal.vaccinations.map((vaccine) => (
                      <li key={vaccine.vaccine_id}>
                        {vaccine.vaccine_name}
                        <button
                          onClick={() =>
                            toggleVaccinationSelection(
                              animal.animal_id,
                              vaccine.vaccine_id,
                              vaccine.vaccine_name
                            )
                          }
                        >
                          {selectedVaccinations.includes(
                            `${animal.animal_id}-${vaccine.vaccine_id}-${vaccine.vaccine_name}`
                          )
                            ? "Kaldır"
                            : "Seç"}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>Geçerli aşı bulunmamaktadır.</p>
          )}
          <button onClick={handleVaccinationSubmission}>Aşıla</button>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;