const { veterinarians } = require('../models/init-models')(require('../utils/db').sequelize);

// Yeni bir veteriner ekle
const createVeterinarian = async (req, res) => {
  try {
    const { contact_number, license_number, specialization } = req.body;

    const newVeterinarian = await veterinarians.create({
      contact_number,
      license_number,
      specialization
    });

    return res.status(201).json({ message: 'Veterinarian created successfully', veterinarian: newVeterinarian });
  } catch (error) {
    console.error('Error creating veterinarian:', error);
    return res.status(500).json({ message: 'Error creating veterinarian', error: error.message });
  }
};

// Tüm veterinerleri listele
const getAllVeterinarians = async (req, res) => {
  try {
    const allVeterinarians = await veterinarians.findAll();
    return res.status(200).json(allVeterinarians);
  } catch (error) {
    console.error('Error fetching veterinarians:', error);
    return res.status(500).json({ message: 'Error fetching veterinarians', error: error.message });
  }
};

// Tek bir veterineri getir
const getVeterinarianById = async (req, res) => {
  try {
    const { id } = req.params;
    const veterinarian = await veterinarians.findByPk(id);
    
    if (!veterinarian) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }

    return res.status(200).json(veterinarian);
  } catch (error) {
    console.error('Error fetching veterinarian:', error);
    return res.status(500).json({ message: 'Error fetching veterinarian', error: error.message });
  }
};

// Veterineri güncelle
const updateVeterinarian = async (req, res) => {
  try {
    const { id } = req.params;
    const { contact_number, license_number, specialization } = req.body;

    const veterinarian = await veterinarians.findByPk(id);

    if (!veterinarian) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }

    await veterinarian.update({ contact_number, license_number, specialization });

    return res.status(200).json({ message: 'Veterinarian updated successfully', veterinarian });
  } catch (error) {
    console.error('Error updating veterinarian:', error);
    return res.status(500).json({ message: 'Error updating veterinarian', error: error.message });
  }
};

// Veterineri sil
const deleteVeterinarian = async (req, res) => {
  try {
    const { id } = req.params;

    const veterinarian = await veterinarians.findByPk(id);

    if (!veterinarian) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }

    await veterinarian.destroy();

    return res.status(200).json({ message: 'Veterinarian deleted successfully' });
  } catch (error) {
    console.error('Error deleting veterinarian:', error);
    return res.status(500).json({ message: 'Error deleting veterinarian', error: error.message });
  }
};

module.exports = {
  createVeterinarian,
  getAllVeterinarians,
  getVeterinarianById,
  updateVeterinarian,
  deleteVeterinarian
};
