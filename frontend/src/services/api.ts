import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/v1';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        // Try to get token from auth-storage (Zustand persist) first
        const authStorage = localStorage.getItem('auth-storage');
        let token = localStorage.getItem(import.meta.env.VITE_JWT_STORAGE_KEY || 'accessToken');

        if (authStorage) {
            try {
                const parsedStorage = JSON.parse(authStorage);
                if (parsedStorage.state?.token) {
                    token = parsedStorage.state.token;
                }
            } catch (e) {
                console.error('Error parsing auth-storage', e);
            }
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle 401 Unauthorized globally
        if (error.response?.status === 401) {
            // Logic for refresh token or logout
            // For now, clean storage
            // localStorage.removeItem(import.meta.env.VITE_JWT_STORAGE_KEY || 'accessToken');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
