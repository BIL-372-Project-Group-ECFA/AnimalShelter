// frontend/src/api/services.js
import axios from 'axios';

// Backend URL'yi React çevresel değişkeninden al

//const baseURL = process.env.REACT_APP_BACKEND_URL;
const baseURL = 'http://localhost:4000';

// Axios istemcisi
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
