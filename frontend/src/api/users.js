import apiClient from './services';

// Fetch the list of users
export const fetchUsers = async () => {
    const response = await apiClient.get('/users');
    return response.data;
};

// Add a new user
export const addUser = async (userData) => {
    const response = await apiClient.post('/users', userData);
    return response.data;
};

// Update a specific user
export const updateUser = async (id, userData) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
};

// Delete a specific user
export const deleteUser = async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
};
