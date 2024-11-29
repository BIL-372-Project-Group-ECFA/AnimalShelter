import apiClient from './services';

// Tüm barınak geçmişi kayıtlarını getir
export const fetchShelterHistories = async () => {
    const response = await apiClient.get('/shelter-history');
    return response.data;
};

// Yeni bir barınak geçmişi kaydı ekle
export const addShelterHistory = async (shelterHistoryData) => {
    const response = await apiClient.post('/shelter-history', shelterHistoryData);
    return response.data;
};

// Belirli bir barınak geçmişi kaydını güncelle
export const updateShelterHistory = async (id, shelterHistoryData) => {
    const response = await apiClient.put(`/shelter-history/${id}`, shelterHistoryData);
    return response.data;
};

// Belirli bir barınak geçmişi kaydını sil
export const deleteShelterHistory = async (id) => {
    const response = await apiClient.delete(`/shelter-history/${id}`);
    return response.data;
};
