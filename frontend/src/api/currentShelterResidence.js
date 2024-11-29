import apiClient from './services';

// Tüm barınak durumlarını getir
export const fetchCurrentShelterResidences = async () => {
    const response = await apiClient.get('/current-shelter-residence');
    return response.data;
};

// Yeni bir barınak durumu ekle
export const addCurrentShelterResidence = async (currentShelterResidenceData) => {
    const response = await apiClient.post('/current-shelter-residence', currentShelterResidenceData);
    return response.data;
};

// Belirli bir barınak durumunu güncelle
export const updateCurrentShelterResidence = async (animalId, currentShelterResidenceData) => {
    const response = await apiClient.put(`/current-shelter-residence/${animalId}`, currentShelterResidenceData);
    return response.data;
};

// Belirli bir barınak durumunu sil
export const deleteCurrentShelterResidence = async (animalId) => {
    const response = await apiClient.delete(`/current-shelter-residence/${animalId}`);
    return response.data;
};
