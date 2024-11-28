import React, { useState } from 'react';
import { addAnimal } from '../api/animals';
import '../styles/AddAnimalForm.css'; // CSS dosyasını import et

// Form bileşeni burada

const AddAnimalForm = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('Male');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [neutered, setNeutered] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const animalData = { name, species, gender, breed, age: parseInt(age), neutered: neutered ? 1 : 0 };
      await addAnimal(animalData);
      alert('Animal added successfully!');
      // Reset form
      setName('');
      setSpecies('');
      setGender('Male');
      setBreed('');
      setAge('');
      setNeutered(false);
    } catch (err) {
        alert("Failed to add animal: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Add Animal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Species:</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
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
            required
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
        <button type="submit">Add Animal</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddAnimalForm;
