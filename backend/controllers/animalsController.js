const multer = require('multer');
const { animals } = require('../models/init-models')(require('../utils/db').sequelize);
const { Op } = require('sequelize');

// Fotoğrafları bellekte tutacak multer yapılandırması
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  },
});

// Yeni bir hayvan ekle (fotoğraf dahil)
const createAnimal = async (req, res) => {
  try {
    const { name, species, gender, breed, age, neutered } = req.body;
    const photo = req.file ? req.file.buffer : null; // Fotoğraf bellekte tutuluyor

    const newAnimal = await animals.create({
      name,
      species,
      gender,
      breed,
      age,
      neutered,
      photo, // Fotoğrafı BLOB olarak kaydediyoruz
    });

    return res.status(201).json({ message: 'Animal created successfully', animal: newAnimal });
  } catch (error) {
    console.error('Error creating animal:', error);
    return res.status(500).json({ message: 'Error creating animal', error: error.message });
  }
};

// Tüm hayvanları listele
const getAllAnimals = async (req, res) => {
  try {
    const allAnimals = await animals.findAll();
    return res.status(200).json(allAnimals);
  } catch (error) {
    console.error('Error fetching animals:', error);
    return res.status(500).json({ message: 'Error fetching animals', error: error.message });
  }
};

// Tek bir hayvanı getir
const getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await animals.findByPk(id);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    return res.status(200).json(animal);
  } catch (error) {
    console.error('Error fetching animal:', error);
    return res.status(500).json({ message: 'Error fetching animal', error: error.message });
  }
};

// Hayvan güncelle
const updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, species, gender, breed, age, neutered } = req.body;
    const photo = req.file ? req.file.buffer : null;

    const animal = await animals.findByPk(id);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    await animal.update({ name, species, gender, breed, age, neutered, photo });

    return res.status(200).json({ message: 'Animal updated successfully', animal });
  } catch (error) {
    console.error('Error updating animal:', error);
    return res.status(500).json({ message: 'Error updating animal', error: error.message });
  }
};

// Hayvan sil
const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;

    const animal = await animals.findByPk(id);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    await animal.destroy();

    return res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (error) {
    console.error('Error deleting animal:', error);
    return res.status(500).json({ message: 'Error deleting animal', error: error.message });
  }
};

const getAnimalsByIds = async (req, res) => {
  try {
    const { animal_ids } = req.query;  // Query string ile alınan animal_ids
    if (!animal_ids) {
      return res.status(400).json({ message: "No animal IDs provided" });
    }

    // animal_ids'leri virgülle ayırıp dizi haline getiriyoruz
    const animalIdsArray = animal_ids.split(',').map(id => parseInt(id, 10));

    // Animal ID'leri ile sorgulama yapıyoruz
    
    const animalsData = await animals.findAll({
      where: {
        animal_id: {
          [Op.in]: animalIdsArray, // adoptionIds array'inde bulunan adoption_id'leri ile eşleşen satırları bulur
        },
      },
    });

    // Eğer hayvanlar bulunmazsa, uygun mesaj ile dönüş yapıyoruz
    if (animalsData.length === 0) {
      return res.status(404).json({ message: 'No animals found with the provided IDs' });
    }

    return res.status(200).json(animalsData);
  } catch (error) {
    console.error('Error fetching animals:', error);
    return res.status(500).json({ message: 'Error fetching animals', error: error.message });
  }
};


module.exports = {
  createAnimal: [upload.single('photo'), createAnimal], // Middleware ile bağladık
  getAllAnimals,
  getAnimalById,
  updateAnimal: [upload.single('photo'), updateAnimal], // Middleware ile bağladık
  deleteAnimal,
  getAnimalsByIds,
};
