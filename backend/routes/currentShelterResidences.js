const express = require('express');
const router = express.Router();
const {
  createCurrentShelterResidence,
  getAllCurrentShelterResidences,
  getCurrentShelterResidenceById,
  updateCurrentShelterResidence,
  deleteCurrentShelterResidence
} = require('../controllers/currentShelterResidenceController');

// Yeni bir barınak durumu ekle
router.post('/', createCurrentShelterResidence);

// Tüm barınak durumlarını listele
router.get('/', getAllCurrentShelterResidences);

// Belirli bir barınak durumunu getir
router.get('/:animal_id', getCurrentShelterResidenceById);

// Barınak durumunu güncelle
router.put('/:animal_id', updateCurrentShelterResidence);

// Barınak durumunu sil
router.delete('/:animal_id', deleteCurrentShelterResidence);

module.exports = router;
