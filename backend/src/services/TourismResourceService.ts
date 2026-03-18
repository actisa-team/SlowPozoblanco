import { AppDataSource } from '../config/database';
import { TourismResource } from '../entities/TourismResource.entity';
import { CreateTourismResourceDto, UpdateTourismResourceDto } from '../dtos/TourismResource.dto';
import { Point } from 'geojson'; // We might need to install @types/geojson or just use string for now if direct raw query
import { Like } from 'typeorm';

export class TourismResourceService {
    private tourismResourceRepository = AppDataSource.getRepository(TourismResource);

    async create(data: CreateTourismResourceDto): Promise<TourismResource> {
        const tourismResource = this.tourismResourceRepository.create(data);
        return this.tourismResourceRepository.save(tourismResource);
    }

    async findAll(query: any) {
        const where: any = {};
        if (query.category) where.category = query.category;
        if (query.search) where.name = Like(`%${query.search}%`);
        if (query.isActive !== undefined) where.isActive = query.isActive === 'true';

        return this.tourismResourceRepository.find({ where, order: { name: 'ASC' } });
    }

    async findOne(id: string): Promise<TourismResource | null> {
        return this.tourismResourceRepository.findOne({ where: { id } });
    }

    async update(id: string, data: UpdateTourismResourceDto): Promise<TourismResource | null> {
        const tourismResource = await this.findOne(id);
        if (!tourismResource) return null;

        this.tourismResourceRepository.merge(tourismResource, data);

        if (data.latitude && data.longitude) {
            // attraction.location = { type: 'Point', coordinates: [data.longitude, data.latitude] } as any;
        }

        return this.tourismResourceRepository.save(tourismResource);
    }

    async delete(id: string): Promise<void> {
        await this.tourismResourceRepository.delete(id);
    }

    async findNearby(lat: number, lng: number, radiusMeters: number = 1000) {
        // Fallback for non-PostGIS environments: Simple lat/lng bounding box or just return all for demo
        // For accurate distance specific logic is needed, but here we will return top 10 for demonstration
        console.warn('PostGIS not enabled. Returning all tourism resources.');
        return this.tourismResourceRepository.find({ take: 10 });
    }
}
