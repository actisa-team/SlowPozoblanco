import { DigitalSign } from '../entities/DigitalSign.entity';
import { AppDataSource } from '../config/database';

export class DigitalSignService {
    private repository = AppDataSource.getRepository(DigitalSign);

    async findAll(): Promise<DigitalSign[]> {
        return this.repository.find();
    }

    async getStats() {
        const total = await this.repository.count();
        const online = await this.repository.count({ where: { status: 'online' } });
        return { total, online, offline: total - online };
    }
}
