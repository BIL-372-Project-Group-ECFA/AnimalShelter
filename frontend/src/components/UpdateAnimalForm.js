import React, { useState } from "react";
import { updateAnimal } from "../api/animals";
import "../styles/UpdateAnimalForm.css"; // CSS dosyasını import et

const UpdateAnimalForm = () => {
  const [animalId, setAnimalId] = useState("");
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("Male");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [neutered, setNeutered] = useState(false);
  const [photo, setPhoto] = useState(null); // Fotoğraf dosyası
  const [preview, setPreview] = useState(null); // Fotoğraf önizleme
  const [error, setError] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file); // Fotoğrafı kaydet
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result); // Önizleme için URL oluştur
      reader.readAsDataURL(file);
    } else {
      setPreview(null); // Fotoğraf seçimi iptal edilirse önizlemeyi temizle
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("animalId", animalId);
      formData.append("name", name);
      formData.append("species", species);
      formData.append("gender", gender);
      formData.append("breed", breed);
      formData.append("age", parseInt(age));
      formData.append("neutered", neutered ? "1" : "0");
      if (photo) {
        formData.append("photo", photo); // Fotoğrafı ekle
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await updateAnimal(animalId,formData);
      alert("Animal updated successfully!");
      // Formu sıfırla
      setAnimalId("");
      setName("");
      setSpecies("");
      setGender("Male");
      setBreed("");
      setAge("");
      setNeutered(false);
      setPhoto(null);
      setPreview(null);
    } catch (err) {
      console.error("Failed to update animal:", err);
      setError("Failed to update animal: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div>
      <h2>Update Animal</h2>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <div>
          <label>Animal ID:</label>
          <input
            type="text"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Species:</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Breed:</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>Neutered:</label>
          <input
            type="checkbox"
            checked={neutered}
            onChange={(e) => setNeutered(e.target.checked)}
          />
        </div>
        <div>
          <label>Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        {preview && (
          <div>
            <p>Photo Preview:</p>
            <img
              src={preview}
              alt="Selected animal"
              style={{ width: "400px", height: "400px", objectFit: "cover" }}
            />
          </div>
        )}
        <button type="submit">Update Animal</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateAnimalForm;
