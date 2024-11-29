const { current_shelter_residences, animals, shelter_history } = require('../models/init-models')(require('../utils/db').sequelize);

/**
 * Create a new current shelter residence
 */
const createCurrentShelterResidence = async (req, res) => {
  try {
    const { animal_id, shelter_residence_id } = req.body;

    // Validate if animal exists
    const animal = await animals.findByPk(animal_id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    // Validate if shelter residence exists (if provided)
    const shelterResidence = shelter_residence_id
      ? await shelter_history.findByPk(shelter_residence_id)
      : null;
    if (shelter_residence_id && !shelterResidence) {
      return res.status(404).json({ message: 'Shelter residence not found' });
    }

    // Create or update the current shelter residence
    const newResidence = await current_shelter_residences.upsert({
      animal_id,
      shelter_residence_id: shelter_residence_id || null,
    });

    return res.status(201).json({
      message: 'Current shelter residence created successfully',
      residence: newResidence,
    });
  } catch (error) {
    console.error('Error creating shelter residence:', error);
    return res.status(500).json({
      message: 'Error creating shelter residence',
      error: error.message,
    });
  }
};

/**
 * Get all current shelter residences
 */
const getAllCurrentShelterResidences = async (req, res) => {
  try {
    const residences = await current_shelter_residences.findAll({
      include: [
        {
          model: animals,
          attributes: ['name', 'species', 'breed', 'age', 'gender'],
        },
        {
          model: shelter_history,
          attributes: ['shelter_entry_date', 'shelter_exit_date'],
        },
      ],
    });

    return res.status(200).json(residences);
  } catch (error) {
    console.error('Error fetching shelter residences:', error);
    return res.status(500).json({
      message: 'Error fetching shelter residences',
      error: error.message,
    });
  }
};

/**
 * Get a specific current shelter residence by ID
 */
const getCurrentShelterResidenceById = async (req, res) => {
  try {
    const { id } = req.params;

    const residence = await current_shelter_residences.findOne({
      where: { animal_id: id },
      include: [
        {
          model: animals,
          attributes: ['name', 'species', 'breed', 'age', 'gender'],
        },
        {
          model: shelter_history,
          attributes: ['shelter_entry_date', 'shelter_exit_date'],
        },
      ],
    });

    if (!residence) {
      return res.status(404).json({ message: 'Current shelter residence not found' });
    }

    return res.status(200).json(residence);
  } catch (error) {
    console.error('Error fetching shelter residence:', error);
    return res.status(500).json({
      message: 'Error fetching shelter residence',
      error: error.message,
    });
  }
};

/**
 * Update a specific current shelter residence
 */
const updateCurrentShelterResidence = async (req, res) => {
  try {
    const { id } = req.params;
    const { shelter_residence_id } = req.body;

    const residence = await current_shelter_residences.findOne({
      where: { animal_id: id },
    });

    if (!residence) {
      return res.status(404).json({ message: 'Current shelter residence not found' });
    }

    if (shelter_residence_id) {
      const shelterResidence = await shelter_history.findByPk(shelter_residence_id);
      if (!shelterResidence) {
        return res.status(404).json({ message: 'Shelter residence not found' });
      }
    }

    residence.shelter_residence_id = shelter_residence_id || null;
    await residence.save();

    return res.status(200).json({
      message: 'Current shelter residence updated successfully',
      residence,
    });
  } catch (error) {
    console.error('Error updating shelter residence:', error);
    return res.status(500).json({
      message: 'Error updating shelter residence',
      error: error.message,
    });
  }
};

/**
 * Delete a specific current shelter residence
 */
const deleteCurrentShelterResidence = async (req, res) => {
  try {
    const { id } = req.params;

    const residence = await current_shelter_residences.findOne({
      where: { animal_id: id },
    });

    if (!residence) {
      return res.status(404).json({ message: 'Current shelter residence not found' });
    }

    await residence.destroy();

    return res.status(200).json({ message: 'Current shelter residence deleted successfully' });
  } catch (error) {
    console.error('Error deleting shelter residence:', error);
    return res.status(500).json({
      message: 'Error deleting shelter residence',
      error: error.message,
    });
  }
};

module.exports = {
  createCurrentShelterResidence,
  getAllCurrentShelterResidences,
  getCurrentShelterResidenceById,
  updateCurrentShelterResidence,
  deleteCurrentShelterResidence,
};
