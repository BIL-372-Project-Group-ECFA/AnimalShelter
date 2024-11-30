const express = require('express');
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  getDonationsByDonorId
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

// Belirli bir donor_id'ye ait bağışları getir
router.get('/donor/:donor_id', getDonationsByDonorId);

module.exports = router;

