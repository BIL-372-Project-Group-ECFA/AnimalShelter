const { shelter_history, animals, shelters } = require('../models/init-models')(require('../utils/db').sequelize);

/**
 * Create a new shelter history record
 */
const createShelterHistory = async (req, res) => {
  try {
    const { animal_id, shelter_id, arrival_date } = req.body;

    // Validate if animal exists
    const animal = await animals.findByPk(animal_id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    // Validate if shelter exists
    const shelter = await shelters.findByPk(shelter_id);
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }

    // Create shelter history record
    const newShelterHistory = await shelter_history.create({
      animal_id,
      shelter_id,
      arrival_date,
    });

    return res.status(201).json({
      message: 'Shelter history created successfully',
      shelterHistory: newShelterHistory,
    });
  } catch (error) {
    console.error('Error creating shelter history:', error);
    return res.status(500).json({
      message: 'Error creating shelter history',
      error: error.message,
    });
  }
};

/**
 * Get all shelter history records
 */
const getAllShelterHistories = async (req, res) => {
  try {
    const shelterHistories = await shelter_history.findAll({
      include: [
        {
          model: animals,
          attributes: ['name', 'species', 'breed', 'age', 'gender'],
        },
        {
          model: shelters,
          attributes: ['name', 'location'],
        },
      ],
    });

    return res.status(200).json(shelterHistories);
  } catch (error) {
    console.error('Error fetching shelter histories:', error);
    return res.status(500).json({
      message: 'Error fetching shelter histories',
      error: error.message,
    });
  }
};

/**
 * Get a specific shelter history by shelter_residence_id
 */
const getShelterHistoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const shelterHistory = await shelter_history.findByPk(id, {
      include: [
        {
          model: animals,
          attributes: ['name', 'species', 'breed', 'age', 'gender'],
        },
        {
          model: shelters,
          attributes: ['name', 'location'],
        },
      ],
    });

    if (!shelterHistory) {
      return res.status(404).json({ message: 'Shelter history not found' });
    }

    return res.status(200).json(shelterHistory);
  } catch (error) {
    console.error('Error fetching shelter history:', error);
    return res.status(500).json({
      message: 'Error fetching shelter history',
      error: error.message,
    });
  }
};

/**
 * Update a specific shelter history record
 */
const updateShelterHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { shelter_id, arrival_date } = req.body;

    const shelterHistory = await shelter_history.findByPk(id);

    if (!shelterHistory) {
      return res.status(404).json({ message: 'Shelter history not found' });
    }

    // Validate if shelter exists
    if (shelter_id) {
      const shelter = await shelters.findByPk(shelter_id);
      if (!shelter) {
        return res.status(404).json({ message: 'Shelter not found' });
      }
    }

    shelterHistory.shelter_id = shelter_id || shelterHistory.shelter_id;
    shelterHistory.arrival_date = arrival_date || shelterHistory.arrival_date;

    await shelterHistory.save();

    return res.status(200).json({
      message: 'Shelter history updated successfully',
      shelterHistory,
    });
  } catch (error) {
    console.error('Error updating shelter history:', error);
    return res.status(500).json({
      message: 'Error updating shelter history',
      error: error.message,
    });
  }
};

/**
 * Delete a specific shelter history record
 */
const deleteShelterHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const shelterHistory = await shelter_history.findByPk(id);

    if (!shelterHistory) {
      return res.status(404).json({ message: 'Shelter history not found' });
    }

    await shelterHistory.destroy();

    return res.status(200).json({ message: 'Shelter history deleted successfully' });
  } catch (error) {
    console.error('Error deleting shelter history:', error);
    return res.status(500).json({
      message: 'Error deleting shelter history',
      error: error.message,
    });
  }
};

module.exports = {
  createShelterHistory,
  getAllShelterHistories,
  getShelterHistoryById,
  updateShelterHistory,
  deleteShelterHistory,
};
