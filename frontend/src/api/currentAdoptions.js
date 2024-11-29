import apiClient from './services';

// Current adoption durumlarını getir
export const fetchCurrentAdoptions = async () => {
    const response = await apiClient.get('/current-adoption');
    return response.data;
};

// Yeni bir evlat edinme durumu ekle
export const addCurrentAdoption = async (currentAdoptionData) => {
    const response = await apiClient.post('/current-adoption', currentAdoptionData);
    return response.data;
};

// Belirli bir evlat edinme durumunu güncelle
export const updateCurrentAdoption = async (animalId, currentAdoptionData) => {
    const response = await apiClient.put(`/current-adoption/${animalId}`, currentAdoptionData);
    return response.data;
};

// Belirli bir evlat edinme durumunu sil
export const deleteCurrentAdoption = async (animalId) => {
    const response = await apiClient.delete(`/current-adoption/${animalId}`);
    return response.data;
};
