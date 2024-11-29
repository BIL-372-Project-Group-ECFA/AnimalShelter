const express = require('express');
const router = express.Router();
const {
  createAdoptionHistory,
  getAllAdoptionHistories,
  getAdoptionHistoryById,
  updateAdoptionHistory,
  deleteAdoptionHistory,
} = require('../controllers/adoptionHistoryController');

// Yeni bir evlat edinme tarihi ekle
router.post('/', createAdoptionHistory);

// Tüm evlat edinme tarihlerini listele
router.get('/', getAllAdoptionHistories);

// Tek bir evlat edinme tarihini getir
router.get('/:id', getAdoptionHistoryById);

// Evlat edinme tarihini güncelle
router.put('/:id', updateAdoptionHistory);

// Evlat edinme tarihini sil
router.delete('/:id', deleteAdoptionHistory);

module.exports = router;
