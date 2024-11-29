const express = require('express');
const router = express.Router();
const {
  createCurrentAdoption,
  getAllCurrentAdoptions,
  getCurrentAdoptionById,
  updateCurrentAdoption,
  deleteCurrentAdoption
} = require('../controllers/currentAdoptionController');

// Yeni bir evlat edinme durumu ekle
router.post('/', createCurrentAdoption);

// Tüm evlat edinme durumlarını listele
router.get('/', getAllCurrentAdoptions);

// Belirli bir evlat edinme durumunu getir
router.get('/:animal_id', getCurrentAdoptionById);

// Evlat edinme durumunu güncelle
router.put('/:animal_id', updateCurrentAdoption);

// Evlat edinme durumunu sil
router.delete('/:animal_id', deleteCurrentAdoption);

module.exports = router;
