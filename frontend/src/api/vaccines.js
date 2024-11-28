import apiClient from './services';

// Aşı listesini getir
export const fetchVaccines = async () => {
    const response = await apiClient.get('/vaccines');
    return response.data;
};

// Yeni bir aşı ekle
export const addVaccine = async (vaccineData) => {
    const response = await apiClient.post('/vaccines', vaccineData);
    return response.data;
};

// Belirli bir aşıyı güncelle
export const updateVaccine = async (id, vaccineData) => {
    const response = await apiClient.put(`/vaccines/${id}`, vaccineData);
    return response.data;
};

// Belirli bir aşıyı sil
export const deleteVaccine = async (id) => {
    const response = await apiClient.delete(`/vaccines/${id}`);
    return response.data;
};
