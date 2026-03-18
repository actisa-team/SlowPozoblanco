export interface ParkingSpace {
    id: string;
    zone: string;
    spaceNumber: string;
    isOccupied: boolean;
    occupiedSince?: string; // ISO date string
    lastHeartbeat: string;
    latitude: number;
    longitude: number;
}

export interface ParkingStats {
    total: number;
    occupied: number;
    available: number;
}
