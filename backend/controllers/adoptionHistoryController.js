const { adoption_history, current_adoptions } = require('../models/init-models')(require('../utils/db').sequelize);
const { Op } = require('sequelize');

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

// Adopter_id ile adoption_history tablosunda eşleşen satırları bulduktan sonra,
// bu satırlardaki adoption_id ile current_adoptions tablosunda sorgulama yapan fonksiyon.
const getCurrentAdoptionsByAdopterID = async (req, res) => {
  try {
    const { adopter_id } = req.params;  // Parametreden adopter_id alınır

    // İlk olarak adoption_history tablosunda adopter_id ile eşleşen kayıtları alıyoruz
    const adoptionHistories = await adoption_history.findAll({
      where: { adopter_id: adopter_id },
    });

    // Eğer adoption_history tablosunda eşleşen kayıt bulunmazsa, 404 döndürüyoruz
    if (adoptionHistories.length === 0) {
      return res.status(404).json({ message: 'No adoption history found for this adopter_id' });
    }

    // adoption_id'leri çıkartıyoruz
    const adoptionIds = adoptionHistories.map(history => history.adoption_id);

    // Şimdi, bu adoption_id'leri kullanarak current_adoptions tablosunda sorgulama yapıyoruz
    const currentAdoptions = await current_adoptions.findAll({
      where: {
        adoption_id: {
          [Op.in]: adoptionIds, // adoptionIds array'inde bulunan adoption_id'leri ile eşleşen satırları bulur
        },
      },
    });

    // current_adoptions tablosunda eşleşen veri bulunmazsa, 404 döndürüyoruz
    if (currentAdoptions.length === 0) {
      return res.status(404).json({ message: 'No current adoption found for the provided adoption_id' });
    }

    // Her iki tablodan gelen verileri birleştirip döndürüyoruz
    return res.status(200).json({
      currentAdoptions,
    });
  } catch (error) {
    console.error('Error fetching adoption history and current adoptions:', error);
    return res.status(500).json({
      message: 'Error fetching adoption history and current adoptions',
      error: error.message,
    });
  }
};

module.exports = {
  createAdoptionHistory,
  getAllAdoptionHistories,
  getAdoptionHistoryById,
  updateAdoptionHistory,
  deleteAdoptionHistory,
  getCurrentAdoptionsByAdopterID,
};
