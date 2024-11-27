import apiClient from './services';

// Hayvan listesini getir
export const fetchAnimals = async () => {
    const response = await apiClient.get('/animals');
    return response.data;
};

// Yeni bir hayvan ekle
export const addAnimal = async (animalData) => {
    const response = await apiClient.post('/animals', animalData);
    return response.data;
};

// Belirli bir hayvanı güncelle
export const updateAnimal = async (id, animalData) => {
    const response = await apiClient.put(`/animals/${id}`, animalData);
    return response.data;
};

// Belirli bir hayvanı sil
export const deleteAnimal = async (id) => {
    const response = await apiClient.delete(`/animals/${id}`);
    return response.data;
};
