import React from "react";

const AdoptedAnimals = () => {
  const adoptedAnimals = [
    { id: 1, name: "Kara", species: "Kedi", age: 2 },
    { id: 2, name: "Beyaz", species: "Köpek", age: 3 },
  ]; // Örnek veri, backend'den çağrılabilir

  return (
    <div>
      <h3>Sahiplenilen Hayvanlar</h3>
      {adoptedAnimals.length > 0 ? (
        <ul className="list">
          {adoptedAnimals.map((animal) => (
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
