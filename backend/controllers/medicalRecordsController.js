const { medical_records, animals, veterinarians } = require('../models/init-models')(require('../utils/db').sequelize);

// Yeni bir medikal kayıt ekle
const createMedicalRecord = async (req, res) => {
  try {
    const { animal_id, check_up_date, veterinarian_id, next_check_up_date } = req.body;

    // Hayvan var mı kontrol et
    const animal = await animals.findByPk(animal_id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    // Veteriner var mı kontrol et
    const veterinarian = veterinarian_id ? await veterinarians.findByPk(veterinarian_id) : null;
    if (veterinarian_id && !veterinarian) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }

    const newMedicalRecord = await medical_records.create({
      animal_id,
      check_up_date,
      veterinarian_id: veterinarian_id || null,
      next_check_up_date
    });

    return res.status(201).json({ message: 'Medical record created successfully', medicalRecord: newMedicalRecord });
  } catch (error) {
    console.error('Error creating medical record:', error);
    return res.status(500).json({ message: 'Error creating medical record', error: error.message });
  }
};

// Tüm medikal kayıtları listele
const getAllMedicalRecords = async (req, res) => {
  try {
    const allMedicalRecords = await medical_records.findAll({
      include: [
        {
          model: animals,
          as: 'animal',
          attributes: ['name', 'species', 'breed', 'age', 'gender']
        },
        {
          model: veterinarians,
          as: 'veterinarian',
          attributes: ['contact_number', 'license_number','specialization']
        }
      ]
    });
    return res.status(200).json(allMedicalRecords);
  } catch (error) {
    console.error('Error fetching medical records:', error);
    return res.status(500).json({ message: 'Error fetching medical records', error: error.message });
  }
};

// Belirli bir medikal kaydı getir
const getMedicalRecordById = async (req, res) => {
  try {
    const { record_id } = req.params;
    const medicalRecord = await medical_records.findOne({
      where: { record_id },
      include: [
        {
          model: animals,
          as: 'animal',
          attributes: ['name', 'species', 'breed', 'age', 'gender']
        },
        {
          model: veterinarians,
          as: 'veterinarian',
          attributes: ['contact_number', 'license_number','specialization']
        }
      ]
    });

    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    return res.status(200).json(medicalRecord);
  } catch (error) {
    console.error('Error fetching medical record:', error);
    return res.status(500).json({ message: 'Error fetching medical record', error: error.message });
  }
};

// Medikal kaydı güncelle
const updateMedicalRecord = async (req, res) => {
  try {
    const { record_id } = req.params;
    const { check_up_date, veterinarian_id, next_check_up_date } = req.body;

    const medicalRecord = await medical_records.findOne({ where: { record_id } });

    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    // Veteriner var mı kontrol et
    const veterinarian = veterinarian_id ? await veterinarians.findByPk(veterinarian_id) : null;
    if (veterinarian_id && !veterinarian) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }

    await medicalRecord.update({
      check_up_date,
      veterinarian_id: veterinarian_id || null,
      next_check_up_date
    });

    return res.status(200).json({ message: 'Medical record updated successfully', medicalRecord });
  } catch (error) {
    console.error('Error updating medical record:', error);
    return res.status(500).json({ message: 'Error updating medical record', error: error.message });
  }
};

// Medikal kaydı sil
const deleteMedicalRecord = async (req, res) => {
  try {
    const { record_id } = req.params;

    const medicalRecord = await medical_records.findOne({ where: { record_id } });

    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    await medicalRecord.destroy();

    return res.status(200).json({ message: 'Medical record deleted successfully' });
  } catch (error) {
    console.error('Error deleting medical record:', error);
    return res.status(500).json({ message: 'Error deleting medical record', error: error.message });
  }
};

const getMedicalRecordsByAnimalId = async (req, res) => {
  try {
    const { animal_id } = req.params;

    // medical_records tablosunda ilgili animal_id ile eşleşen kayıtları bul
    const records = await medical_records.findAll({
      where: {
        animal_id, // Şart: animal_id eşleşmesi
      },
    });

    if (records.length === 0) {
      return res.status(404).json({ message: 'No medical records found for this animal.' });
    }

    return res.status(200).json(records); // Kayıtları döndür
  } catch (error) {
    console.error('Error fetching medical records:', error);
    return res.status(500).json({ message: 'An error occurred while fetching medical records.' });
  }
};

module.exports = {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecordsByAnimalId
};
