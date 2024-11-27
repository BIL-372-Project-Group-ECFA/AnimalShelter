const { animals } = require('../models/init-models')(require('../utils/db').sequelize);

// Yeni bir hayvan ekle
const createAnimal = async (req, res) => {
  try {
    const { name, species, gender, breed, age, neutered } = req.body;

    const newAnimal = await animals.create({
      name,
      species,
      gender,
      breed,
      age,
      neutered
    });

    return res.status(201).json({ message: 'Animal created successfully', animal: newAnimal });
  } catch (error) {
    console.error('Error creating animal:', error);
    return res.status(500).json({ message: 'Error creating animal', error: error.message });
  }
};

// Tüm hayvanları listele
const getAllAnimals = async (req, res) => {
  try {
    const allAnimals = await animals.findAll();
    return res.status(200).json(allAnimals);
  } catch (error) {
    console.error('Error fetching animals:', error);
    return res.status(500).json({ message: 'Error fetching animals', error: error.message });
  }
};

// Tek bir hayvanı getir
const getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await animals.findByPk(id);
    
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    return res.status(200).json(animal);
  } catch (error) {
    console.error('Error fetching animal:', error);
    return res.status(500).json({ message: 'Error fetching animal', error: error.message });
  }
};

// Hayvan güncelle
const updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, species, gender, breed, age, neutered } = req.body;

    const animal = await animals.findByPk(id);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    await animal.update({ name, species, gender, breed, age, neutered });

    return res.status(200).json({ message: 'Animal updated successfully', animal });
  } catch (error) {
    console.error('Error updating animal:', error);
    return res.status(500).json({ message: 'Error updating animal', error: error.message });
  }
};

// Hayvan sil
const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;

    const animal = await animals.findByPk(id);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    await animal.destroy();

    return res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (error) {
    console.error('Error deleting animal:', error);
    return res.status(500).json({ message: 'Error deleting animal', error: error.message });
  }
};

module.exports = {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal
};