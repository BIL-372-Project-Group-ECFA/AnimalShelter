import apiClient from './services';

// Aşılama detaylarını listele
export const fetchVaccinationDetails = async () => {
    const response = await apiClient.get('/vaccination-details');
    return response.data;
};

// Yeni bir aşılama detayı ekle
export const addVaccinationDetail = async (vaccinationData) => {
    const response = await apiClient.post('/vaccination-details', vaccinationData);
    return response.data;
};

// Belirli bir aşılama detayını güncelle
export const updateVaccinationDetail = async (id, vaccinationData) => {
    const response = await apiClient.put(`/vaccination-details/${id}`, vaccinationData);
    return response.data;
};

// Belirli bir aşılama detayını sil
export const deleteVaccinationDetail = async (id) => {
    const response = await apiClient.delete(`/vaccination-details/${id}`);
    return response.data;
};
