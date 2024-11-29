import apiClient from './services';

// Barınak listesini getir
export const fetchShelters = async () => {
  const response = await apiClient.get('/shelters');
  return response.data;
};

// Yeni bir barınak ekle
export const addShelter = async (shelterData) => {
  const response = await apiClient.post('/shelters', shelterData);
  return response.data;
};

// Belirli bir barınağı güncelle
export const updateShelter = async (id, shelterData) => {
  const response = await apiClient.put(`/shelters/${id}`, shelterData);
  return response.data;
};

// Belirli bir barınağı sil
export const deleteShelter = async (id) => {
  const response = await apiClient.delete(`/shelters/${id}`);
  return response.data;
};
