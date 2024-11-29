const { current_adoptions, animals, adoption_history } = require('../models/init-models')(require('../utils/db').sequelize);

// Yeni bir evlat edinme durumu ekle
const createCurrentAdoption = async (req, res) => {
  try {
    const { animal_id, adoption_id } = req.body;

    // Evlat edinme geçmişi var mı kontrol et
    const animal = await animals.findByPk(animal_id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    const adoption = adoption_id ? await adoption_history.findByPk(adoption_id) : null;
    if (adoption_id && !adoption) {
      return res.status(404).json({ message: 'Adoption not found' });
    }

    const newAdoption = await current_adoptions.create({
      animal_id,
      adoption_id: adoption_id || null
    });

    return res.status(201).json({ message: 'Current adoption created successfully', adoption: newAdoption });
  } catch (error) {
    console.error('Error creating current adoption:', error);
    return res.status(500).json({ message: 'Error creating current adoption', error: error.message });
  }
};

// Tüm evlat edinme durumlarını listele
const getAllCurrentAdoptions = async (req, res) => {
  try {
    const allAdoptions = await current_adoptions.findAll({
      include: [
        {
          model: animals,
          as: 'animal',
          attributes: ['name', 'species', 'breed', 'age', 'gender']
        },
        {
          model: adoption_history,
          as: 'adoption',
          attributes: ['adoption_id', 'adoption_date']
        }
      ]
    });
    return res.status(200).json(allAdoptions);
  } catch (error) {
    console.error('Error fetching current adoptions:', error);
    return res.status(500).json({ message: 'Error fetching current adoptions', error: error.message });
  }
};

// Belirli bir evlat edinme durumunu getir
const getCurrentAdoptionById = async (req, res) => {
  try {
    const { animal_id } = req.params;
    const adoption = await current_adoptions.findOne({
      where: { animal_id },
      include: [
        {
          model: animals,
          as: 'animal',
          attributes: ['name', 'species', 'breed', 'age', 'gender']
        },
        {
          model: adoption_history,
          as: 'adoption',
          attributes: ['adoption_date']
        }
      ]
    });

    if (!adoption) {
      return res.status(404).json({ message: 'Current adoption not found' });
    }

    return res.status(200).json(adoption);
  } catch (error) {
    console.error('Error fetching current adoption:', error);
    return res.status(500).json({ message: 'Error fetching current adoption', error: error.message });
  }
};

// Evlat edinme durumunu güncelle
const updateCurrentAdoption = async (req, res) => {
  try {
    const { animal_id } = req.params;
    const { adoption_id } = req.body;

    const adoption = await current_adoptions.findOne({ where: { animal_id } });

    if (!adoption) {
      return res.status(404).json({ message: 'Current adoption not found' });
    }

    // Evlat edinme geçmişi var mı kontrol et
    const newAdoption = adoption_id ? await adoption_history.findByPk(adoption_id) : null;
    if (adoption_id && !newAdoption) {
      return res.status(404).json({ message: 'Adoption not found' });
    }

    await adoption.update({ adoption_id: adoption_id || null });

    return res.status(200).json({ message: 'Current adoption updated successfully', adoption });
  } catch (error) {
    console.error('Error updating current adoption:', error);
    return res.status(500).json({ message: 'Error updating current adoption', error: error.message });
  }
};

// Evlat edinme durumunu sil
const deleteCurrentAdoption = async (req, res) => {
  try {
    const { animal_id } = req.params;

    const adoption = await current_adoptions.findOne({ where: { animal_id } });

    if (!adoption) {
      return res.status(404).json({ message: 'Current adoption not found' });
    }

    await adoption.destroy();

    return res.status(200).json({ message: 'Current adoption deleted successfully' });
  } catch (error) {
    console.error('Error deleting current adoption:', error);
    return res.status(500).json({ message: 'Error deleting current adoption', error: error.message });
  }
};

module.exports = {
  createCurrentAdoption,
  getAllCurrentAdoptions,
  getCurrentAdoptionById,
  updateCurrentAdoption,
  deleteCurrentAdoption
};
