import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axiosInstance from "../../api/axiosInstance";

const ManagerDashboard = () => {
  const { selectedShelter } = useContext(AppContext);
  const [animals, setAnimals] = useState([]); // Shelter'daki hayvanlar
  const [strayAnimals, setStrayAnimals] = useState([]); // Başıboş hayvanlar
  const [view, setView] = useState("overview"); // Görünüm durumu
  const [error, setError] = useState(null); // Hata durumu
  const [arrivalDate, setArrivalDate] = useState(""); // Seçilen tarih

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
      <h1 className="title">Barınak Yönetici Paneli</h1>
      <div className="shelter-info">
        <h2>{selectedShelter.location}</h2>
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
              onChange={handleDateChange} // Tarih seçimi
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
                </li>
              ))}
            </ul>
          ) : (
            <p>Barınakta hayvan bulunmamaktadır.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
