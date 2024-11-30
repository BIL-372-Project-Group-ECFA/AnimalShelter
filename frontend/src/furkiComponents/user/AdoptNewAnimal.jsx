import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext"; // Assuming context is available for the user ID
import axiosInstance from "../../api/axiosInstance";
import "./AdoptNewAnimal.css"; // Create a CSS file for styling

const AdoptNewAnimal = () => {
  const { userId } = useContext(AppContext); // Get user ID from context
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState("");
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [message, setMessage] = useState("");
  const [showAnimals, setShowAnimals] = useState(false); // To control animal listing visibility

  // Fetch all shelters on component mount
  useEffect(() => {
    axiosInstance
      .get("/shelters") // Endpoint to get all shelters
      .then((response) => {
        setShelters(response.data); // Assuming response.data contains a list of shelters
      })
      .catch((error) => {
        console.error("Error fetching shelters:", error);
      });
  }, []);

  // Fetch animals from the selected shelter
  const fetchAnimals = () => {
    if (!selectedShelter) {
      alert("Please select a shelter first.");
      return;
    }

    axiosInstance
      .get(`/shelters/${selectedShelter}/current-animals`) // Endpoint to get animals in the selected shelter
      .then((response) => {
        setAnimals(response.data.animals || []); // Assuming response.data.animals contains the list
        setShowAnimals(true); // Show the list of animals
      })
      .catch((error) => {
        console.error("Error fetching animals:", error);
      });
  };

  // Handle adoption
  const handleAdoptAnimal = () => {
    if (!selectedShelter || !selectedAnimal || !userId) {
      alert("Please select a shelter, an animal, and ensure you are logged in.");
      return;
    }

    const adoptionData = {
      adopter_id: userId, // Adopting user's ID
      animal_id: selectedAnimal,
      shelter_id: selectedShelter,
      adoption_date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    };

    axiosInstance
  .post("/adoption-history", adoptionData) // İlk endpoint: adoption-history
  .then((response) => {
    const adoptionID = response.data.adoption.adoption_id; // İlk isteğin sonucundan adoption_id alınıyor
    const currentAdoptionData = { animal_id: selectedAnimal, adoption_id: adoptionID };
    
    // İkinci endpoint: current-adoption
    return axiosInstance.post("/current-adoption", currentAdoptionData);
  })
  .then((response2) => {
    // İkinci işlem başarılı olduktan sonra current-shelter-residences'ı sil
    return axiosInstance.delete("/current-shelter-residences/"+selectedAnimal, {
     animal_id: selectedAnimal } // DELETE isteğinde veriyi 'data' içinde gönderiyoruz
    );
  })
  .then((response3) => {
    // Eğer üç işlem de başarılı olursa
    setMessage("Congratulations on adopting your new pet!");
    setSelectedShelter("");
    setSelectedAnimal("");
    setAnimals([]);
    setShowAnimals(false);
  })
  .catch((error) => {
    // Hatalar topluca burada yakalanır
    console.error("Error processing adoption:", error);
    setMessage("There was an error completing your adoption. Please try again.");
  });


  };

  return (
    <div className="adopt-new-animal-container">
      <h3>Yeni Bir Hayvan Sahiplen</h3>

      {/* Shelter Selection */}
      <div className="form-group">
        <label htmlFor="shelterSelect">Barınak Seçiniz:</label>
        <select
          id="shelterSelect"
          value={selectedShelter}
          onChange={(e) => {
            setSelectedShelter(e.target.value);
            setAnimals([]);
            setShowAnimals(false); // Reset animals when the shelter changes
          }}
        >
          <option value="">-- Barınak Seçiniz --</option>
          {shelters.map((shelter) => (
            <option key={shelter.shelter_id} value={shelter.shelter_id}>
              {shelter.location}
            </option>
          ))}
        </select>
      </div>

      {/* List Animals Button */}
      <button
        className="list-animals-button"
        onClick={fetchAnimals}
        disabled={!selectedShelter}
      >
        Hayvanları Listele
      </button>

      {/* Animal List */}
      {showAnimals && (
        <div className="animal-list">
          <h4>Hayvanlar</h4>
          {animals.length > 0 ? (
            <ul>
              {animals.map((animal) => (
                <li key={animal.animal_id}>
                  {animal.name} ({animal.species})
                  <button
                    onClick={() => setSelectedAnimal(animal.animal_id)}
                    className={`select-animal-button ${
                      selectedAnimal === animal.animal_id ? "selected" : ""
                    }`}
                  >
                    Seç
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Barınakta hayvan bulunmamaktadır.</p>
          )}
        </div>
      )}

      {/* Adopt Button */}
      <button
        className="adopt-button"
        onClick={handleAdoptAnimal}
        disabled={!selectedAnimal}
      >
        Sahiplen
      </button>

      {/* Adoption Message */}
      {message && <p className="adoption-message">{message}</p>}
    </div>
  );
};

export default AdoptNewAnimal;
