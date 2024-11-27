import React, { useState } from "react";
import { updateAnimal } from "../api/animals";
import "../styles/UpdateAnimalForm.css"; // CSS dosyasını import et

// Form bileşeni burada

const UpdateAnimalForm = () => {
  const [animalId, setAnimalId] = useState("");
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("Male");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [neutered, setNeutered] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { name, species, gender, breed, age: parseInt(age), neutered: neutered ? 1 : 0 };
    try {
      await updateAnimal(animalId, updatedData);
      alert("Animal updated successfully!");
      // Reset form
      setAnimalId("");
      setName("");
      setSpecies("");
      setGender("Male");
      setBreed("");
      setAge("");
      setNeutered(false);
    } catch (err) {
      console.error("Failed to update animal:", err);
      setError("Failed to update animal: " + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Update Animal</h2>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update Animal</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateAnimalForm;
