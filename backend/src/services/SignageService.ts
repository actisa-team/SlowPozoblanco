import { AppDataSource } from '../config/database';
import { Signage, DeviceStatus } from '../entities/Signage.entity';
import { TourismResource } from '../entities/TourismResource.entity';

export class SignageService {
    private repository = AppDataSource.getRepository(Signage);
    private tourismResourceRepo = AppDataSource.getRepository(TourismResource);

    async create(data: Partial<Signage>) {
        if (data.associatedResource && typeof data.associatedResource === 'string') {
            const resource = await this.tourismResourceRepo.findOne({ where: { id: data.associatedResource } });
            if (resource) data.associatedResource = resource;
        }
        return this.repository.save(this.repository.create(data));
    }

    async findAll() {
        return this.repository.find({ relations: ['associatedResource'] });
    }

    async findOne(id: string) {
        return this.repository.findOne({ where: { id }, relations: ['associatedResource'] });
    }

    async update(id: string, data: Partial<Signage>) {
        await this.repository.update(id, data);
        return this.findOne(id);
    }

    async delete(id: string) {
        return this.repository.delete(id);
    }

    async heartbeat(deviceId: string) {
        const sign = await this.repository.findOne({ where: { deviceId } });
        if (sign) {
            sign.lastHeartbeat = new Date();
            sign.status = DeviceStatus.ONLINE;
            return this.repository.save(sign);
        }
        return null;
    }
}
