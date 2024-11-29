import apiClient from './services';

// Tüm bağışları getir
export const fetchDonations = async () => {
    const response = await apiClient.get('/donations');
    return response.data;
};

// Yeni bir bağış ekle
export const addDonation = async (donationData) => {
    const response = await apiClient.post('/donations', donationData);
    return response.data;
};

// Belirli bir bağışı güncelle
export const updateDonation = async (donationId, donationData) => {
    const response = await apiClient.put(`/donations/${donationId}`, donationData);
    return response.data;
};

// Belirli bir bağışı sil
export const deleteDonation = async (donationId) => {
    const response = await apiClient.delete(`/donations/${donationId}`);
    return response.data;
};
