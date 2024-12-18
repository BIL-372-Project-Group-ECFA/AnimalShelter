const express = require('express');
const router = express.Router();
const {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
  getAnimalsByIds,
} = require('../controllers/animalsController');

router.get('/getSpecificAnimals', getAnimalsByIds);

// Yeni bir hayvan ekle
router.post('/', createAnimal);

// Tüm hayvanları listele
router.get('/', getAllAnimals);

// Tek bir hayvanı getir
router.get('/:id', getAnimalById);

// Hayvan güncelle
router.put('/:id', updateAnimal);

// Hayvan sil
router.delete('/:id', deleteAnimal);



module.exports = router;
