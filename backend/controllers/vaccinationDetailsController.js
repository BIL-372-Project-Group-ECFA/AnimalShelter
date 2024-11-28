const { vaccination_details } = require('../models/init-models')(require('../utils/db').sequelize);

// Yeni bir aşılama detayı ekle
const createVaccinationDetail = async (req, res) => {
  try {
    const { animal_id, vaccination_type_id, vaccination_date } = req.body;

    // Tarihi tersine çevir: 'YYYY-MM-DD' -> 'DD-MM-YYYY'
    const formattedDate = vaccination_date 
      ? vaccination_date.split('.').reverse().join('-') 
      : null;

    const newVaccinationDetail = await vaccination_details.create({
      animal_id,
      vaccination_type_id,
      vaccination_date: formattedDate,
    });

    return res.status(201).json({ message: 'Vaccination detail created successfully', vaccination: newVaccinationDetail });
  } catch (error) {
    console.error('Error creating vaccination detail:', error);
    return res.status(500).json({ message: 'Error creating vaccination detail', error: error.message });
  }
};

// Tüm aşılama detaylarını listele
const getAllVaccinationDetails = async (req, res) => {
  try {
    const allVaccinationDetails = await vaccination_details.findAll();

    // Tarih formatını geri çevir: 'DD-MM-YYYY' -> 'YYYY-MM-DD'
    const formattedDetails = allVaccinationDetails.map(detail => ({
      ...detail.toJSON(),
      vaccination_date: detail.vaccination_date 
        ? detail.vaccination_date.split('.').reverse().join('-') 
        : null,
    }));

    return res.status(200).json(formattedDetails);
  } catch (error) {
    console.error('Error fetching vaccination details:', error);
    return res.status(500).json({ message: 'Error fetching vaccination details', error: error.message });
  }
};

// Tek bir aşılama detayını getir
const getVaccinationDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const vaccinationDetail = await vaccination_details.findByPk(id);

    if (!vaccinationDetail) {
      return res.status(404).json({ message: 'Vaccination detail not found' });
    }

    // Tarih formatını geri çevir
    const formattedDetail = {
      ...vaccinationDetail.toJSON(),
      vaccination_date: vaccinationDetail.vaccination_date
        ? vaccinationDetail.vaccination_date.split('.').reverse().join('-')
        : null,
    };

    return res.status(200).json(formattedDetail);
  } catch (error) {
    console.error('Error fetching vaccination detail:', error);
    return res.status(500).json({ message: 'Error fetching vaccination detail', error: error.message });
  }
};

// Aşılama detayını güncelle
const updateVaccinationDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { animal_id, vaccination_type_id, vaccination_date } = req.body;

    // Tarihi tersine çevir
    const formattedDate = vaccination_date
      ? vaccination_date.split('.').reverse().join('-')
      : null;

    const vaccinationDetail = await vaccination_details.findByPk(id);

    if (!vaccinationDetail) {
      return res.status(404).json({ message: 'Vaccination detail not found' });
    }

    await vaccinationDetail.update({ animal_id, vaccination_type_id, vaccination_date: formattedDate });

    return res.status(200).json({ message: 'Vaccination detail updated successfully', vaccination: vaccinationDetail });
  } catch (error) {
    console.error('Error updating vaccination detail:', error);
    return res.status(500).json({ message: 'Error updating vaccination detail', error: error.message });
  }
};

// Aşılama detayını sil
const deleteVaccinationDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const vaccinationDetail = await vaccination_details.findByPk(id);

    if (!vaccinationDetail) {
      return res.status(404).json({ message: 'Vaccination detail not found' });
    }

    await vaccinationDetail.destroy();

    return res.status(200).json({ message: 'Vaccination detail deleted successfully' });
  } catch (error) {
    console.error('Error deleting vaccination detail:', error);
    return res.status(500).json({ message: 'Error deleting vaccination detail', error: error.message });
  }
};

module.exports = {
  createVaccinationDetail,
  getAllVaccinationDetails,
  getVaccinationDetailById,
  updateVaccinationDetail,
  deleteVaccinationDetail,
};
