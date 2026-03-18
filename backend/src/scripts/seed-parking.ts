import { AppDataSource, initializeDatabase } from '../config/database';
import { ParkingSpace } from '../entities/ParkingSpace.entity';

const seedParking = async () => {
    try {
        await initializeDatabase();
        const repo = AppDataSource.getRepository(ParkingSpace);

        const spaces = [
            { zone: 'Centro', spaceNumber: 'A1', latitude: 38.3795, longitude: -4.8490, isOccupied: false },
            { zone: 'Centro', spaceNumber: 'A2', latitude: 38.3796, longitude: -4.8491, isOccupied: true, occupiedSince: new Date() },
            { zone: 'Centro', spaceNumber: 'A3', latitude: 38.3797, longitude: -4.8492, isOccupied: false },
            { zone: 'Norte', spaceNumber: 'B1', latitude: 38.3820, longitude: -4.8510, isOccupied: false },
            { zone: 'Norte', spaceNumber: 'B2', latitude: 38.3821, longitude: -4.8511, isOccupied: true, occupiedSince: new Date() },
        ];

        console.log('Seeding parking spaces...');
        for (const space of spaces) {
            const exists = await repo.findOne({ where: { spaceNumber: space.spaceNumber } });
            if (!exists) {
                await repo.save(repo.create({ ...space, sensorId: `SENSOR-${space.spaceNumber}`, lastHeartbeat: new Date() }));
            }
        }
        console.log('Parking spaces seeded.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding parking:', error);
        process.exit(1);
    }
};

seedParking();
