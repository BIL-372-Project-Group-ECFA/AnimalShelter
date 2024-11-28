import apiClient from './services';

// Adoption history listesini getir
export const fetchAdoptionHistories = async () => {
    const response = await apiClient.get('/adoption_history');
    return response.data;
};

// Yeni bir adoption history kaydı ekle
export const addAdoptionHistory = async (adoptionHistoryData) => {
    const response = await apiClient.post('/adoption_history', adoptionHistoryData);
    return response.data;
};

// Belirli bir adoption history kaydını güncelle
export const updateAdoptionHistory = async (id, adoptionHistoryData) => {
    const response = await apiClient.put(`/adoption_history/${id}`, adoptionHistoryData);
    return response.data;
};

// Belirli bir adoption history kaydını sil
export const deleteAdoptionHistory = async (id) => {
    const response = await apiClient.delete(`/adoption_history/${id}`);
    return response.data;
};
