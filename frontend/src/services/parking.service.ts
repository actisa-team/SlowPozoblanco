import { api } from './api';
import type { ParkingSpace, ParkingStats } from '../types/parking.types';

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const ParkingService = {
    async getAll(): Promise<ParkingSpace[]> {
        const response = await api.get<ApiResponse<ParkingSpace[]>>('/parking/spaces');
        return response.data.data;
    },

    async getStats(): Promise<ParkingStats> {
        const response = await api.get<ApiResponse<ParkingStats>>('/parking/availability');
        return response.data.data;
    }
};
