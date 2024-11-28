const express = require('express');
const router = express.Router();
const {
  createAdoptionHistory,
  getAllAdoptionHistories,
  getAdoptionHistoryById,
  updateAdoptionHistory,
  deleteAdoptionHistory
} = require('../controllers/adoption_historyController');

// Yeni bir adoption history kaydı ekle
router.post('/', createAdoptionHistory);

// Tüm adoption history kayıtlarını listele
router.get('/', getAllAdoptionHistories);

// Tek bir adoption history kaydını getir
router.get('/:id', getAdoptionHistoryById);

// Adoption history güncelle
router.put('/:id', updateAdoptionHistory);

// Adoption history sil
router.delete('/:id', deleteAdoptionHistory);

module.exports = router;
