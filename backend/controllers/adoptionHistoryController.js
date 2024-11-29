const { adoption_history } = require('../models/init-models')(require('../utils/db').sequelize);


const createAdoptionHistory = async (req, res) => {
  try {
    const { shelter_id, adopter_id, animal_id, adoption_date } = req.body;

    // Tarihi doğru formatta al
    const formattedDate = adoption_date ? adoption_date.split('.').reverse().join('-') : null;

    const newAdoptionHistory = await adoption_history.create({
      shelter_id,
      adopter_id,
      animal_id,
      adoption_date: formattedDate,
    });

    return res.status(201).json({ message: 'Adoption history created successfully', adoption: newAdoptionHistory });
  } catch (error) {
    console.error('Error creating adoption history:', error);
    return res.status(500).json({ message: 'Error creating adoption history', error: error.message });
  }
};

// Tüm evlat edinme tarihlerini listele
const getAllAdoptionHistories = async (req, res) => {
  try {
    const allAdoptionHistories = await adoption_history.findAll();

    // Tarih formatını geri çevir: 'DD-MM-YYYY' -> 'YYYY-MM-DD'
    const formattedHistories = allAdoptionHistories.map(history => ({
      ...history.toJSON(),
      adoption_date: history.adoption_date
        ? history.adoption_date.split('.').reverse().join('-')
        : null,
    }));

    return res.status(200).json(formattedHistories);
  } catch (error) {
    console.error('Error fetching adoption histories:', error);
    return res.status(500).json({ message: 'Error fetching adoption histories', error: error.message });
  }
};

// Tek bir evlat edinme tarihini getir
const getAdoptionHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const adoptionHistory = await adoption_history.findByPk(id);

    if (!adoptionHistory) {
      return res.status(404).json({ message: 'Adoption history not found' });
    }

    // Tarih formatını geri çevir
    const formattedHistory = {
      ...adoptionHistory.toJSON(),
      adoption_date: adoptionHistory.adoption_date
        ? adoptionHistory.adoption_date.split('.').reverse().join('-')
        : null,
    };

    return res.status(200).json(formattedHistory);
  } catch (error) {
    console.error('Error fetching adoption history:', error);
    return res.status(500).json({ message: 'Error fetching adoption history', error: error.message });
  }
};

// Evlat edinme tarihini güncelle
const updateAdoptionHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { shelter_id, adopter_id, animal_id, adoption_date } = req.body;

    // Tarihi tersine çevir
    const formattedDate = adoption_date ? adoption_date.split('.').reverse().join('-') : null;

    const adoptionHistory = await adoption_history.findByPk(id);

    if (!adoptionHistory) {
      return res.status(404).json({ message: 'Adoption history not found' });
    }

    await adoptionHistory.update({
      shelter_id,
      adopter_id,
      animal_id,
      adoption_date: formattedDate,
    });

    return res.status(200).json({ message: 'Adoption history updated successfully', adoption: adoptionHistory });
  } catch (error) {
    console.error('Error updating adoption history:', error);
    return res.status(500).json({ message: 'Error updating adoption history', error: error.message });
  }
};

// Evlat edinme tarihini sil
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
  deleteAdoptionHistory,
};
