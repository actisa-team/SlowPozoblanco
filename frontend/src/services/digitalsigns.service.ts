import { api } from './api';

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

interface DigitalSignStats {
    total: number;
    online: number;
    offline: number;
}

export const DigitalSignService = {
    async getStats(): Promise<DigitalSignStats> {
        const response = await api.get<ApiResponse<DigitalSignStats>>('/digital-signs/stats');
        return response.data.data;
    }
};
