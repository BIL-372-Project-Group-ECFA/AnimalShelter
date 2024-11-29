//const { shelters } = require('../models/init-models')(require('../utils/db').sequelize);
const { sequelize, models } = require("../utils/db"); // Modelleri içe aktarın
const { animals, shelters, current_shelter_residences, shelter_history, vaccination_details, vaccines } = models;
const Sequelize = require('sequelize');


// Yeni bir sığınak ekle
const createShelter = async (req, res) => {
  try {
    const { location, capacity, current_animal_count, phone_number } = req.body;

    const newShelter = await shelters.create({
      location,
      capacity,
      current_animal_count,
      phone_number
    });

    return res.status(201).json({ message: 'Shelter created successfully', shelter: newShelter });
  } catch (error) {
    console.error('Error creating shelter:', error);
    return res.status(500).json({ message: 'Error creating shelter', error: error.message });
  }
};

// Tüm barınakları listele
const getAllShelters = async (req, res) => {
  try {
    const allShelters = await shelters.findAll();
    return res.status(200).json(allShelters);
  } catch (error) {
    console.error('Error fetching shelters:', error);
    return res.status(500).json({ message: 'Error fetching shelters', error: error.message });
  }
};

// Tek bir barınağı getir
const getShelterById = async (req, res) => {
  try {
    const { id } = req.params;
    const shelter = await shelters.findByPk(id);
    
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }

    return res.status(200).json(shelter);
  } catch (error) {
    console.error('Error fetching shelter:', error);
    return res.status(500).json({ message: 'Error fetching shelter', error: error.message });
  }
};

// Barınak güncelle
const updateShelter = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, capacity, current_animal_count, phone_number } = req.body;

    const shelter = await shelters.findByPk(id);

    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }

    await shelter.update({ location, capacity, current_animal_count, phone_number });

    return res.status(200).json({ message: 'Shelter updated successfully', shelter });
  } catch (error) {
    console.error('Error updating shelter:', error);
    return res.status(500).json({ message: 'Error updating shelter', error: error.message });
  }
};

// Barınak sil
const deleteShelter = async (req, res) => {
  try {
    const { id } = req.params;

    const shelter = await shelters.findByPk(id);

    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }

    await shelter.destroy();

    return res.status(200).json({ message: 'Shelter deleted successfully' });
  } catch (error) {
    console.error('Error deleting shelter:', error);
    return res.status(500).json({ message: 'Error deleting shelter', error: error.message });
  }
};

// Belli bir shelter'daki güncel hayvanları döndüren handler
const getCurrentAnimalsByShelter = async (req, res) => {
  const shelterId = req.params.id; // Route parametresinden shelter_id'yi al

  try {
    // Shelter'a ait güncel hayvanları bul
    const currentAnimals = await current_shelter_residences.findAll({
      include: [
        {
          model: shelter_history,
          as: "shelter_residence", // Tanımlı alias'ı kullanıyoruz
          where: { shelter_id: shelterId }, // İlgili shelter_id'yi eşleştir
          include: [
            {
              model: animals,
              as: "animal", // Animals için alias tanımlı
              attributes: ["animal_id", "name", "species", "gender", "age", "neutered", "breed"], // Döndürülecek alanlar
            },
          ],
        },
      ],
    });

    // Eğer barınağa ait hayvan yoksa
    /*if (currentAnimals.length === 0) {
      return res.status(404).json({ message: "Barınakta hayvan bulunamadı." });
    }*/

    // Sonuçları formatla
    const formattedAnimals = currentAnimals.map((entry) => entry.shelter_residence.animal);

    return res.status(200).json({
      shelterId: shelterId,
      animals: formattedAnimals,
    });
  } catch (error) {
    console.error("Güncel shelter hayvanları getirilirken hata:", error);
    return res.status(500).json({ message: "Sunucu hatası." });
  }
};


const getStrayAnimals = async (req, res) => {
  try {
    const strayAnimals = await animals.findAll({
      where: {
        animal_id: {
          [Sequelize.Op.and]: [
            {
              [Sequelize.Op.notIn]: sequelize.literal(
                `(SELECT csr.animal_id FROM current_shelter_residences AS csr)`
              ),
            },
            {
              [Sequelize.Op.notIn]: sequelize.literal(
                `(SELECT ca.animal_id FROM current_adoptions AS ca)`
              ),
            },
          ],
        },
      },
      attributes: [
        "animal_id",
        "name",
        "species",
        "gender",
        "age",
        "neutered",
        "breed",
      ],
    });

    /*if (!strayAnimals || strayAnimals.length === 0) {
      return res.status(200).json({ message: "Başıboş hayvan bulunamadı." });
    }*/

    return res.status(200).json(strayAnimals);
  } catch (error) {
    console.error("Başıboş hayvanlar getirilirken hata:", error);
    return res.status(500).json({ message: "Sunucu hatası." });
  }
};


const addAnimalToTheShelter = async (req, res) => {
  const shelterId = req.params.id; // Route parametresinden shelter ID alıyoruz
  const { animal_id, arrival_date } = req.body; // Request body'sinden gerekli bilgileri alıyoruz

  if (!animal_id || !arrival_date) {
    return res.status(400).json({ message: "Animal ID ve Arrival Date gereklidir." });
  }

  try {
    // Transaction başlatıyoruz
    const result = await sequelize.transaction(async (t) => {
      // Shelter History tablosuna yeni kayıt ekle
      const shelterHistoryEntry = await shelter_history.create(
        {
          animal_id,
          shelter_id: shelterId,
          arrival_date,
        },
        { transaction: t }
      );

      // shelter_history'den alınan shelter_residence_id'yi kullanarak current_shelter_residences'a ekle
      await current_shelter_residences.create(
        {
          animal_id,
          shelter_residence_id: shelterHistoryEntry.shelter_residence_id, // Yeni oluşturulan ID
        },
        { transaction: t }
      );

      return shelterHistoryEntry;
    });

    return res.status(201).json({
      message: "Hayvan barınağa başarıyla eklendi.",
      shelterResidenceId: result.shelter_residence_id,
    });
  } catch (error) {
    console.error("Hayvan eklenirken hata oluştu:", error);
    return res.status(500).json({ message: "Sunucu hatası. Hayvan eklenemedi." });
  }
};




const getExpiredVaccinations = async (req, res) => {
  const shelterId = req.params.id;
  const { selectedDate } = req.body; // Barınak ID ve seçilen tarih

  try {
    const animalsInShelter = await animals.findAll({
      attributes: ["animal_id", "name", "species", "age"],
      include: [
        {
          model: current_shelter_residences,
          as: "current_shelter_residence",
          required: true,
          include: [
            {
              model: shelter_history,
              as: "shelter_residence",
              required: true,
              where: { shelter_id: shelterId }, // Barınak ID filtresi
            },
          ],
        },
      ],
    });

    // Tüm aşı tiplerini al
    const allVaccines = await vaccines.findAll({
      attributes: ["vaccine_id", "vaccine_name", "validity_period"],
    });

    const results = [];

    for (const animal of animalsInShelter) {
      const animalId = animal.animal_id;

      // Hayvanın tüm aşı detaylarını al
      const vaccinationDetails = await vaccination_details.findAll({
        where: { animal_id: animalId },
        attributes: ["vaccination_type_id", "vaccination_date"],
        include: [
          {
            model: vaccines,
            as: "vaccination_type",
            attributes: ["vaccine_id", "vaccine_name", "validity_period"],
          },
        ],
      });

      const groupedVaccinations = vaccinationDetails.reduce((acc, detail) => {
        const vaccineId = detail.vaccination_type_id;
        const lastDate =
          acc[vaccineId]?.vaccination_date || detail.vaccination_date;

        acc[vaccineId] = {
          vaccination_date:
            new Date(lastDate) > new Date(detail.vaccination_date)
              ? lastDate
              : detail.vaccination_date,
          vaccine_id: detail.vaccination_type.vaccine_id,
          vaccine_name: detail.vaccination_type.vaccine_name,
          validity_period: detail.vaccination_type.validity_period,
        };

        return acc;
      }, {});

      const expiredAndMissingVaccines = allVaccines
        .map((vaccine) => {
          const vaccinationRecord = groupedVaccinations[vaccine.vaccine_id];

          if (!vaccinationRecord) {
            return { 
              vaccine_id: vaccine.vaccine_id, 
              vaccine_name: vaccine.vaccine_name, 
              status: "missing" 
            };
          }

          const expirationDate = new Date(
            vaccinationRecord.vaccination_date
          );
          expirationDate.setMonth(
            expirationDate.getMonth() + vaccine.validity_period
          );

          if (expirationDate < new Date(selectedDate)) {
            return {
              vaccine_id: vaccine.vaccine_id,
              vaccine_name: vaccine.vaccine_name,
              vaccination_date: vaccinationRecord.vaccination_date,
              expiration_date: expirationDate,
              status: "expired",
            };
          }

          return null;
        })
        .filter(Boolean);

      if (expiredAndMissingVaccines.length > 0) {
        results.push({
          animal_id: animalId,
          name: animal.name,
          species: animal.species,
          age: animal.age,
          vaccinations: expiredAndMissingVaccines,
        });
      }
    }

    res.status(200).json({ results });
  } catch (error) {
    console.error("Aşı sorgusu sırasında hata:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};




const addVaccinations = async (req, res) => {
  const shelterId = req.params.id;
  const vaccinations = req.body; // Frontend'den gelen aşı bilgileri

  try {
    // Gelen verinin doğruluğunu kontrol et
    if (!Array.isArray(vaccinations) || vaccinations.length === 0) {
      return res.status(400).json({ message: "Geçerli bir aşı bilgisi gönderilmedi." });
    }

    // Her bir aşı için kayıt oluştur
    const createdRecords = await Promise.all(
      vaccinations.map(async (vaccination) => {
        const { animal_id, vaccine_id, vaccination_date } = vaccination;

        // Gerekli alanların eksik olup olmadığını kontrol et
        if (!animal_id || !vaccine_id || !vaccination_date) {
          throw new Error("Eksik aşı bilgisi tespit edildi.");
        }

        // Aşıyı `vaccination_details` tablosuna ekle
        return await vaccination_details.create({
          animal_id,
          vaccination_type_id: vaccine_id,
          vaccination_date,
        });
      })
    );

    res.status(201).json({
      message: "Aşılar başarıyla eklendi.",
      added_vaccinations: createdRecords,
    });
  } catch (error) {
    console.error("Aşı ekleme hatası:", error.message);
    res.status(500).json({ message: "Aşılar eklenirken bir hata oluştu.", error: error.message });
  }
};


module.exports = {
  createShelter,
  getAllShelters,
  getShelterById,
  updateShelter,
  deleteShelter,
  getCurrentAnimalsByShelter,
  getStrayAnimals,
  addAnimalToTheShelter,
  getExpiredVaccinations,
  addVaccinations,
};
