import apiClient from './services';

// Tüm medikal kayıtları getir
export const fetchMedicalRecords = async () => {
    const response = await apiClient.get('/medical-records');
    return response.data;
};

// Yeni bir medikal kayıt ekle
export const addMedicalRecord = async (medicalRecordData) => {
    const response = await apiClient.post('/medical-records', medicalRecordData);
    return response.data;
};

// Belirli bir medikal kaydı güncelle
export const updateMedicalRecord = async (recordId, medicalRecordData) => {
    const response = await apiClient.put(`/medical-records/${recordId}`, medicalRecordData);
    return response.data;
};

// Belirli bir medikal kaydı sil
export const deleteMedicalRecord = async (recordId) => {
    const response = await apiClient.delete(`/medical-records/${recordId}`);
    return response.data;
};
