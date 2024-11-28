const express = require('express');
const router = express.Router();
const {
  createShelter,
  getAllShelters,
  getShelterById,
  updateShelter,
  deleteShelter
} = require('../controllers/sheltersController');

// Yeni bir barınak ekle
router.post('/', createShelter);

// Tüm barınakları listele
router.get('/', getAllShelters);

// Tek bir barınağı getir
router.get('/:id', getShelterById);

// Barınak güncelle
router.put('/:id', updateShelter);

// Barınak sil
router.delete('/:id', deleteShelter);

module.exports = router;
