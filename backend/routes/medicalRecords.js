const express = require('express');
const router = express.Router();
const {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord
} = require('../controllers/medicalRecordsController');

// Yeni bir medikal kayıt ekle
router.post('/', createMedicalRecord);

// Tüm medikal kayıtları listele
router.get('/', getAllMedicalRecords);

// Belirli bir medikal kaydı getir
router.get('/:record_id', getMedicalRecordById);

// Medikal kaydını güncelle
router.put('/:record_id', updateMedicalRecord);

// Medikal kaydını sil
router.delete('/:record_id', deleteMedicalRecord);

module.exports = router;
