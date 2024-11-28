const { adoption_history } = require('../models/init-models')(require('../utils/db').sequelize);

// Yeni bir adoption_history kaydı ekle
const createAdoptionHistory = async (req, res) => {
  try {
    const { shelter_id, adopter_id, adoption_date, animal_id } = req.body;

    const newAdoptionHistory = await adoption_history.create({
      shelter_id,
      adopter_id,
      adoption_date,
      animal_id
    });

    return res.status(201).json({ message: 'Adoption history created successfully', adoption_history: newAdoptionHistory });
  } catch (error) {
    console.error('Error creating adoption history:', error);
    return res.status(500).json({ message: 'Error creating adoption history', error: error.message });
  }
};

// Tüm adoption_history kayıtlarını listele
const getAllAdoptionHistories = async (req, res) => {
  try {
    const allAdoptionHistories = await adoption_history.findAll();
    return res.status(200).json(allAdoptionHistories);
  } catch (error) {
    console.error('Error fetching adoption histories:', error);
    return res.status(500).json({ message: 'Error fetching adoption histories', error: error.message });
  }
};

// Tek bir adoption_history kaydını getir
const getAdoptionHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const adoptionHistory = await adoption_history.findByPk(id);
    
    if (!adoptionHistory) {
      return res.status(404).json({ message: 'Adoption history not found' });
    }

    return res.status(200).json(adoptionHistory);
  } catch (error) {
    console.error('Error fetching adoption history:', error);
    return res.status(500).json({ message: 'Error fetching adoption history', error: error.message });
  }
};

// Adoption history güncelle
const updateAdoptionHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { shelter_id, adopter_id, adoption_date, animal_id } = req.body;

    const adoptionHistory = await adoption_history.findByPk(id);

    if (!adoptionHistory) {
      return res.status(404).json({ message: 'Adoption history not found' });
    }

    await adoptionHistory.update({ shelter_id, adopter_id, adoption_date, animal_id });

    return res.status(200).json({ message: 'Adoption history updated successfully', adoption_history: adoptionHistory });
  } catch (error) {
    console.error('Error updating adoption history:', error);
    return res.status(500).json({ message: 'Error updating adoption history', error: error.message });
  }
};

// Adoption history sil
const deleteAdoptionHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const adoptionHistory = await adoption_history.findByPk(id);

    if (!adoptionHistory) {
      return res.status(404).json({ message: 'Adoption history not found' });
    }

    await adoptionHistory.destroy();

    return res.status(200).json({ message: 'Adoption history deleted successfully' });
  } catch (error) {
    console.error('Error deleting adoption history:', error);
    return res.status(500).json({ message: 'Error deleting adoption history', error: error.message });
  }
};

module.exports = {
  createAdoptionHistory,
  getAllAdoptionHistories,
  getAdoptionHistoryById,
  updateAdoptionHistory,
  deleteAdoptionHistory
};
