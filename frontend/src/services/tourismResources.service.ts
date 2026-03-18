import { api } from './api';
import type { TourismResource, CreateTourismResourceDto, UpdateTourismResourceDto } from '../types/tourismResources.types';

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const TourismResourceService = {
    async getAll(): Promise<TourismResource[]> {
        const response = await api.get<ApiResponse<TourismResource[]>>('/tourism-resources');
        return response.data.data;
    },

    async getOne(id: string): Promise<TourismResource> {
        const response = await api.get<ApiResponse<TourismResource>>(`/tourism-resources/${id}`);
        return response.data.data;
    },

    async create(data: CreateTourismResourceDto): Promise<TourismResource> {
        const response = await api.post<ApiResponse<TourismResource>>('/tourism-resources', data);
        return response.data.data;
    },

    async update(id: string, data: UpdateTourismResourceDto): Promise<TourismResource> {
        const response = await api.patch<ApiResponse<TourismResource>>(`/tourism-resources/${id}`, data);
        return response.data.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/tourism-resources/${id}`);
    },

    async findNearby(lat: number, lng: number): Promise<TourismResource[]> {
        const response = await api.get<ApiResponse<TourismResource[]>>('/tourism-resources/nearby', {
            params: { lat, lng }
        });
        return response.data.data;
    },

    async uploadMedia(id: string, mediaType: string, files: File[]): Promise<TourismResource> {
        const formData = new FormData();
        formData.append('mediaType', mediaType);
        files.forEach((file) => {
            formData.append('files', file);
        });

        const response = await api.post<ApiResponse<TourismResource>>(
            `/tourism-resources/${id}/media`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data.data;
    },

    async deleteMedia(id: string, mediaType: string, filename: string): Promise<TourismResource> {
        const response = await api.delete<ApiResponse<TourismResource>>(
            `/tourism-resources/${id}/media/${filename}`,
            {
                data: { mediaType }
            }
        );
        return response.data.data;
    },
};
