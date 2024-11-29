const express = require('express');
const router = express.Router();
const {
  createVeterinarian,
  getAllVeterinarians,
  getVeterinarianById,
  updateVeterinarian,
  deleteVeterinarian
} = require('../controllers/veterinariansController');

// Yeni bir veteriner ekle
router.post('/', createVeterinarian);

// Tüm veterinerleri listele
router.get('/', getAllVeterinarians);

// Tek bir veterineri getir
router.get('/:id', getVeterinarianById);

// Veterineri güncelle
router.put('/:id', updateVeterinarian);

// Veterineri sil
router.delete('/:id', deleteVeterinarian);

module.exports = router;
