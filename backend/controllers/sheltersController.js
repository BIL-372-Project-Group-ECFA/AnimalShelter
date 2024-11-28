const { shelters } = require('../models/init-models')(require('../utils/db').sequelize);

// Yeni bir sığınak ekle
const createShelter = async (req, res) => {
  try {
    const { location, capacity, current_animal_count, phone_number } = req.body;

    const newShelter = await shelters.create({
      location,
      capacity,
      current_animal_count,
      phone_number
    });

    return res.status(201).json({ message: 'Shelter created successfully', shelter: newShelter });
  } catch (error) {
    console.error('Error creating shelter:', error);
    return res.status(500).json({ message: 'Error creating shelter', error: error.message });
  }
};

// Tüm barınakları listele
const getAllShelters = async (req, res) => {
  try {
    const allShelters = await shelters.findAll();
    return res.status(200).json(allShelters);
  } catch (error) {
    console.error('Error fetching shelters:', error);
    return res.status(500).json({ message: 'Error fetching shelters', error: error.message });
  }
};

// Tek bir barınağı getir
const getShelterById = async (req, res) => {
  try {
    const { id } = req.params;
    const shelter = await shelters.findByPk(id);
    
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }

    return res.status(200).json(shelter);
  } catch (error) {
    console.error('Error fetching shelter:', error);
    return res.status(500).json({ message: 'Error fetching shelter', error: error.message });
  }
};

// Barınak güncelle
const updateShelter = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, capacity, current_animal_count, phone_number } = req.body;

    const shelter = await shelters.findByPk(id);

    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }

    await shelter.update({ location, capacity, current_animal_count, phone_number });

    return res.status(200).json({ message: 'Shelter updated successfully', shelter });
  } catch (error) {
    console.error('Error updating shelter:', error);
    return res.status(500).json({ message: 'Error updating shelter', error: error.message });
  }
};

// Barınak sil
const deleteShelter = async (req, res) => {
  try {
    const { id } = req.params;

    const shelter = await shelters.findByPk(id);

    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }

    await shelter.destroy();

    return res.status(200).json({ message: 'Shelter deleted successfully' });
  } catch (error) {
    console.error('Error deleting shelter:', error);
    return res.status(500).json({ message: 'Error deleting shelter', error: error.message });
  }
};

module.exports = {
  createShelter,
  getAllShelters,
  getShelterById,
  updateShelter,
  deleteShelter
};
