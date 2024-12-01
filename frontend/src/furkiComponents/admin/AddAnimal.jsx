import React, { useState } from "react";
import { addAnimal } from "../../api/animals";
import "./AddAnimal.css";

const AddAnimal = () => {
  const [animalData, setAnimalData] = useState({
    name: "",
    species: "",
    gender: "",
    breed: "",
    age: "",
    neutered: false,
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnimalData({ ...animalData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in animalData) {
      formData.append(key, animalData[key]);
    }
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await addAnimal(formData);
      setSuccessMessage("Hayvan başarıyla eklendi!");
      setAnimalData({
        name: "",
        species: "",
        gender: "",
        breed: "",
        age: "",
        neutered: false,
      });
      setPhoto(null);
      setPhotoPreview(null);
    } catch (err) {
      console.error("Failed to add animal:", err);
      setError("Hayvan eklenirken bir hata oluştu: " + err.message);
    }
  };

  return (
    <div className="add-animal-form">
      <h2>Yeni Hayvan Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Adı:</label>
          <input
            type="text"
            name="name"
            value={animalData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Türü:</label>
          <input
            type="text"
            name="species"
            value={animalData.species}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Cinsiyet:</label>
          <select
            name="gender"
            value={animalData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Seçin</option>
            <option value="Male">Erkek</option>
            <option value="Female">Dişi</option>
          </select>
        </div>
        <div>
          <label>Cinsi:</label>
          <input
            type="text"
            name="breed"
            value={animalData.breed}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Yaşı:</label>
          <input
            type="number"
            name="age"
            value={animalData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="neutered"
            name="neutered"
            checked={animalData.neutered}
            onChange={(e) =>
              setAnimalData({ ...animalData, neutered: e.target.checked })
            }
          />
          <label htmlFor="neutered">Kısırlaştırılmış mı?</label>
        </div>
        <div>
          <input
            type="file"
            id="photoUpload"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="photoUpload" className="upload-label">
            Fotoğraf Yükle
          </label>
          {photoPreview && (
            <div className="photo-preview">
              <p>Fotoğraf Önizlemesi:</p>
              <img src={photoPreview} alt="Animal Preview" />
            </div>
          )}
        </div>
        <button type="submit">Hayvan Ekle</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddAnimal;
