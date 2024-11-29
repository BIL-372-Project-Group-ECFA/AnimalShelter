const express = require('express');
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation
} = require('../controllers/donationsController');

// Yeni bir bağış ekle
router.post('/', createDonation);

// Tüm bağışları listele
router.get('/', getAllDonations);

// Belirli bir bağışı getir
router.get('/:id', getDonationById);

// Bağışı güncelle
router.put('/:id', updateDonation);

// Bağışı sil
router.delete('/:id', deleteDonation);

module.exports = router;
