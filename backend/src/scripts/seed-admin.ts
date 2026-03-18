import { AppDataSource, initializeDatabase } from '../config/database';
import { User } from '../entities/User.entity';
import bcrypt from 'bcrypt';

const seedAdmin = async () => {
    try {
        await initializeDatabase();
        const repo = AppDataSource.getRepository(User);

        const email = 'admin@pozoblanco.es';
        const exists = await repo.findOne({ where: { email } });

        if (exists) {
            console.log('Deleting existing admin user...');
            await repo.remove(exists);
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        console.log('Hash created:', hashedPassword);

        // Verify immediately
        const isMatch = await bcrypt.compare('admin123', hashedPassword);
        console.log('Immediate verification check:', isMatch);

        const admin = repo.create({
            email,
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'System',
            role: 'ROLE_ADMIN' as any,
            isActive: true
        });
        await repo.save(admin);
        console.log('Admin user recreated: admin@pozoblanco.es / admin123');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
