import apiClient from './services';

// Evlat edinme tarihlerini listele
export const fetchAdoptionHistories = async () => {
    const response = await apiClient.get('/adoption-history');
    return response.data;
};

// Yeni bir evlat edinme tarihi ekle
export const addAdoptionHistory = async (adoptionData) => {
    const response = await apiClient.post('/adoption-history', adoptionData);
    return response.data;
};

// Belirli bir evlat edinme tarihini güncelle
export const updateAdoptionHistory = async (id, adoptionData) => {
    const response = await apiClient.put(`/adoption-history/${id}`, adoptionData);
    return response.data;
};

// Belirli bir evlat edinme tarihini sil
export const deleteAdoptionHistory = async (id) => {
    const response = await apiClient.delete(`/adoption-history/${id}`);
    return response.data;
};
