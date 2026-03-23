import { api } from './api';
import type { LoginResponse, User } from '../types/auth.types';

interface ApiResponse<T> {
    success: true;
    data: T;
    message?: string;
}

export const AuthService = {
    async login(data: any): Promise<LoginResponse> {
        const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', data);
        return response.data.data;
    },

    async register(data: any): Promise<User> {
        const response = await api.post<ApiResponse<User>>('/auth/register', data);
        return response.data.data;
    },

    async logout(): Promise<void> {
        // Optional: Call backend to invalidate token if implemented
        // await api.post('/auth/logout');
    },

    async forgotPassword(data: { email: string }): Promise<string> {
        const response = await api.post('/auth/forgot-password', data);
        return response.data.message;
    },

    async resetPassword(data: { email: string, token: string, newPassword: string }): Promise<void> {
        await api.post('/auth/reset-password', data);
    },

    async getProfile(): Promise<User> {
        // Assuming there is a /auth/me or similar, or just relying on stored user
        // For now, return stored user or fetch if needed
        return Promise.resolve({} as User); // Placeholder
    }
};
