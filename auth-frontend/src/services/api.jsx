// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    register: async (userName, email, password) => {
        const response = await api.post('/signup', { userName, email, password });
        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post('/login', { email, password });
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/profile');
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};

export default api;