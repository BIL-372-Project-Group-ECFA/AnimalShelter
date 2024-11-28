import apiClient from './services';

// Veteriner listesini getir
export const fetchVeterinarians = async () => {
    const response = await apiClient.get('/veterinarians');
    return response.data;
};

// Yeni bir veteriner ekle
export const addVeterinarian = async (veterinarianData) => {
    const response = await apiClient.post('/veterinarians', veterinarianData);
    return response.data;
};

// Belirli bir veterineri güncelle
export const updateVeterinarian = async (id, veterinarianData) => {
    const response = await apiClient.put(`/veterinarians/${id}`, veterinarianData);
    return response.data;
};

// Belirli bir veterineri sil
export const deleteVeterinarian = async (id) => {
    const response = await apiClient.delete(`/veterinarians/${id}`);
    return response.data;
};
