import React, { useState } from "react";
import { deleteAnimal } from "../api/animals";
import "../styles/DeleteAnimalForm.css"; // CSS dosyasını import et

// Form bileşeni burada

const DeleteAnimalForm = () => {
  const [animalId, setAnimalId] = useState("");
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteAnimal(animalId); // Hayvan silme işlemi
      alert("Animal deleted successfully!");
      setAnimalId(""); // Formu resetle
    } catch (err) {
      console.error("Failed to delete animal:", err);
      setError("Failed to delete animal: " + err.message); // Hata mesajını göster
    }
  };

  return (
    <div>
      <h2>Delete Animal</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Animal ID:</label>
          <input
            type="text"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Animal</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default DeleteAnimalForm;
