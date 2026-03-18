export const TourismResourceCategory = {
    MONUMENT: 'MONUMENT',
    MUSEUM: 'MUSEUM',
    PARK: 'PARK',
    RESTAURANT: 'RESTAURANT',
    HOTEL: 'HOTEL',
    OTHER: 'OTHER'
} as const;

export type TourismResourceCategory = (typeof TourismResourceCategory)[keyof typeof TourismResourceCategory];

export interface TourismResource {
    id: string;
    name: string;
    description: string;
    category: TourismResourceCategory;
    latitude: number;
    longitude: number;
    address: string;
    phone?: string;
    media?: {
        images?: string[];
        images360?: string[];
        videos?: string[];
        videos360?: string[];
    };
    createdAt: string;
    updatedAt: string;
}

export interface CreateTourismResourceDto {
    name: string;
    description: string;
    category: TourismResourceCategory;
    latitude: number;
    longitude: number;
    address: string;
    phone?: string;
    media?: {
        images?: string[];
        images360?: string[];
        videos?: string[];
        videos360?: string[];
    };
}

export interface UpdateTourismResourceDto extends Partial<CreateTourismResourceDto> { }
