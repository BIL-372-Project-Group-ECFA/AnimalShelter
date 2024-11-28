const { vaccines } = require('../models/init-models')(require('../utils/db').sequelize);

// Yeni bir aşı ekle
const createVaccine = async (req, res) => {
  try {
    const { vaccine_name } = req.body;

    const newVaccine = await vaccines.create({
      vaccine_name
    });

    return res.status(201).json({ message: 'Vaccine created successfully', vaccine: newVaccine });
  } catch (error) {
    console.error('Error creating vaccine:', error);
    return res.status(500).json({ message: 'Error creating vaccine', error: error.message });
  }
};

// Tüm aşılara listele
const getAllVaccines = async (req, res) => {
  try {
    const allVaccines = await vaccines.findAll();
    return res.status(200).json(allVaccines);
  } catch (error) {
    console.error('Error fetching vaccines:', error);
    return res.status(500).json({ message: 'Error fetching vaccines', error: error.message });
  }
};

// Tek bir aşıyı getir
const getVaccineById = async (req, res) => {
  try {
    const { id } = req.params;
    const vaccine = await vaccines.findByPk(id);
    
    if (!vaccine) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }

    return res.status(200).json(vaccine);
  } catch (error) {
    console.error('Error fetching vaccine:', error);
    return res.status(500).json({ message: 'Error fetching vaccine', error: error.message });
  }
};

// Aşı güncelle
const updateVaccine = async (req, res) => {
  try {
    const { id } = req.params;
    const { vaccine_name } = req.body;

    const vaccine = await vaccines.findByPk(id);

    if (!vaccine) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }

    await vaccine.update({ vaccine_name });

    return res.status(200).json({ message: 'Vaccine updated successfully', vaccine });
  } catch (error) {
    console.error('Error updating vaccine:', error);
    return res.status(500).json({ message: 'Error updating vaccine', error: error.message });
  }
};

// Aşı sil
const deleteVaccine = async (req, res) => {
  try {
    const { id } = req.params;

    const vaccine = await vaccines.findByPk(id);

    if (!vaccine) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }

    await vaccine.destroy();

    return res.status(200).json({ message: 'Vaccine deleted successfully' });
  } catch (error) {
    console.error('Error deleting vaccine:', error);
    return res.status(500).json({ message: 'Error deleting vaccine', error: error.message });
  }
};

module.exports = {
  createVaccine,
  getAllVaccines,
  getVaccineById,
  updateVaccine,
  deleteVaccine
};