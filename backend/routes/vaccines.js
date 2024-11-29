const express = require('express');
const router = express.Router();
const {
  createVaccine,
  getAllVaccines,
  getVaccineById,
  updateVaccine,
  deleteVaccine
} = require('../controllers/vaccinesController');

// Yeni bir aşı ekle
router.post('/', createVaccine);

// Tüm aşıları listele
router.get('/', getAllVaccines);

// Tek bir aşıyı getir
router.get('/:id', getVaccineById);

// Aşı güncelle
router.put('/:id', updateVaccine);

// Aşı sil
router.delete('/:id', deleteVaccine);

module.exports = router;
