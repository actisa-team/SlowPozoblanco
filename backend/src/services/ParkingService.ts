import { AppDataSource } from '../config/database';
import { ParkingSpace } from '../entities/ParkingSpace.entity';

export class ParkingService {
    private repository = AppDataSource.getRepository(ParkingSpace);

    async create(data: Partial<ParkingSpace>) {
        return this.repository.save(this.repository.create(data));
    }

    async findAll() {
        return this.repository.find();
    }

    async findOne(id: string) {
        return this.repository.findOne({ where: { id } });
    }

    async updateSensor(id: string, isOccupied: boolean) {
        const space = await this.findOne(id);
        if (space) {
            space.isOccupied = isOccupied;
            if (isOccupied && !space.occupiedSince) space.occupiedSince = new Date();
            if (!isOccupied) space.occupiedSince = null as any;
            space.lastHeartbeat = new Date();
            return this.repository.save(space);
        }
        return null;
    }

    async getAvailability() {
        const total = await this.repository.count();
        const occupied = await this.repository.count({ where: { isOccupied: true } });
        return { total, occupied, available: total - occupied };
    }
}
