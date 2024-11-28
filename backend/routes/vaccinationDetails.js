const express = require('express');
const router = express.Router();
const {
  createVaccinationDetail,
  getAllVaccinationDetails,
  getVaccinationDetailById,
  updateVaccinationDetail,
  deleteVaccinationDetail,
} = require('../controllers/vaccinationDetailsController');

// Yeni bir aşılama detayı ekle
router.post('/', createVaccinationDetail);

// Tüm aşılama detaylarını listele
router.get('/', getAllVaccinationDetails);

// Tek bir aşılama detayını getir
router.get('/:id', getVaccinationDetailById);

// Aşılama detayını güncelle
router.put('/:id', updateVaccinationDetail);

// Aşılama detayını sil
router.delete('/:id', deleteVaccinationDetail);

module.exports = router;
