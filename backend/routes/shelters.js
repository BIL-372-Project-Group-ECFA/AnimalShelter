const express = require('express');
const router = express.Router();
const {
  createShelter,
  getAllShelters,
  getShelterById,
  updateShelter,
  deleteShelter,
  getCurrentAnimalsByShelter,
  getStrayAnimals,
  addAnimalToTheShelter,
} = require('../controllers/sheltersController');

router.post('/:id/add-animal', addAnimalToTheShelter);

router.get('/stray-animals', getStrayAnimals);

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

// Bir barınaktaki hayvanları getir
router.get('/:id/current-animals', getCurrentAnimalsByShelter);


module.exports = router;
