import React, { useState } from 'react';
import { addAnimal } from '../api/animals';
import '../styles/AddAnimalForm.css';

const AddAnimalForm = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('Male');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [neutered, setNeutered] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null); // Önizleme için durum
  const [error, setError] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file); // Fotoğrafı duruma kaydet
    // Fotoğrafı önizleme için okuyun
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result); // Önizleme URL'sini duruma kaydet
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null); // Fotoğraf seçimi iptal edilirse önizlemeyi temizle
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('species', species);
      formData.append('gender', gender);
      formData.append('breed', breed);
      formData.append('age', parseInt(age));
      formData.append('neutered', neutered ? '1' : '0');
      if (photo) {
        formData.append('photo', photo);
      }
      
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await addAnimal(formData);
      alert('Animal added successfully!');
      setName('');
      setSpecies('');
      setGender('Male');
      setBreed('');
      setAge('');
      setNeutered(false);
      setPhoto(null);
      setPreview(null); // Önizlemeyi sıfırla
    } catch (err) {
      setError(err.message || 'An error occurred while adding the animal.');
    }
  };

  return (
    <div>
      <h2>Add Animal</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              style={{ width: '400px', height: '400px', objectFit: 'cover' }}
            />
          </div>
        )}
        <button type="submit">Add Animal</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddAnimalForm;
