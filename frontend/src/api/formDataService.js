// frontend/src/api/services.js
import axios from 'axios';

// Backend URL'yi React çevresel değişkeninden al
const baseURL = process.env.REACT_APP_BACKEND_URL;

// Axios istemcisi
const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export default apiClient;
