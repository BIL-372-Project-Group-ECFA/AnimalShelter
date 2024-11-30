import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios"; // Axios ile API çağrısı yapacağız

const AdoptedAnimals = () => {
  const { userId } = useContext(AppContext); // User ID'yi context'ten alıyoruz
  const [animals, setAnimals] = useState([]); // Sahiplenilen hayvanlar için state
  const [loading, setLoading] = useState(true); // Yükleniyor durumu
  const [error, setError] = useState(""); // Hata durumu

  useEffect(() => {
    const fetchAdoptedAnimals = async () => {
      try {
        // 1. adopter_id ile adoption-history'yi sorgula
        const adoptionHistoryResponse = await axios.get(`/adoption-history/user/${userId}`);
        console.log(adoptionHistoryResponse.data);
        const animalIds = adoptionHistoryResponse.data.map(adopt => adopt.animal_id);
        console.log(animalIds);
        // 2. animal_id ile animals'ı sorgula
        const animalsResponse = await axios.get('/animals/getSpecificAnimals', {
          params: { animal_ids: animalIds }
        });
        
        console.log("-------------------")
        console.log(animalsResponse.data);
        // Sahiplenilen hayvanları state'e set et
        setAnimals(animalsResponse.data);
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

  return (
    <div>
      <h3>Sahiplenilen Hayvanlar</h3>
      {animals.length > 0 ? (
        <ul className="list">
          {animals.map((animal) => (
            <li key={animal.id} className="list-item">
              <strong>Adı:</strong> {animal.name} <br />
              <strong>Türü:</strong> {animal.species} <br />
              <strong>Yaşı:</strong> {animal.age}
            </li>
          ))}
        </ul>
      ) : (
        <p>Henüz sahiplenilen bir hayvan bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default AdoptedAnimals;
