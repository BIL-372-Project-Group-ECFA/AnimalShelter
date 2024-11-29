const express = require('express');
const router = express.Router();
const {
  createShelterHistory,
  getAllShelterHistories,
  getShelterHistoryById,
  updateShelterHistory,
  deleteShelterHistory
} = require('../controllers/shelterHistoryController');

// Yeni bir barınak geçmişi kaydı ekle
router.post('/', createShelterHistory);

// Tüm barınak geçmişi kayıtlarını listele
router.get('/', getAllShelterHistories);

// Belirli bir barınak geçmişi kaydını getir
router.get('/:id', getShelterHistoryById);

// Barınak geçmişi kaydını güncelle
router.put('/:id', updateShelterHistory);

// Barınak geçmişi kaydını sil
router.delete('/:id', deleteShelterHistory);

module.exports = router;
