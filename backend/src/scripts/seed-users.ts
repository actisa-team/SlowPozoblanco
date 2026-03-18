import { AppDataSource, initializeDatabase } from '../config/database';
import { User } from '../entities/User.entity';
import bcrypt from 'bcrypt';
import { UserRole } from '../types';

const seedUsers = async () => {
    try {
        await initializeDatabase();
        const repo = AppDataSource.getRepository(User);

        const users = [
            {
                email: 'admin@pozoblanco.es',
                password: 'admin123',
                firstName: 'Admin',
                lastName: 'System',
                role: UserRole.ADMIN,
            },
            {
                email: 'manager@pozoblanco.es',
                password: 'manager123',
                firstName: 'Manager',
                lastName: 'Demo',
                role: UserRole.MANAGER,
            },
            {
                email: 'user@pozoblanco.es',
                password: 'user123',
                firstName: 'Usuario',
                lastName: 'Demo',
                role: UserRole.USER,
            },
        ];

        for (const userData of users) {
            const exists = await repo.findOne({ where: { email: userData.email } });

            if (exists) {
                console.log(`Actualizando usuario: ${userData.email}`);
                exists.password = await bcrypt.hash(userData.password, 10);
                exists.role = userData.role;
                exists.firstName = userData.firstName;
                exists.lastName = userData.lastName;
                exists.isActive = true;
                await repo.save(exists);
            } else {
                console.log(`Creando usuario: ${userData.email}`);
                const hashedPassword = await bcrypt.hash(userData.password, 10);
                const user = repo.create({
                    ...userData,
                    password: hashedPassword,
                    isActive: true,
                });
                await repo.save(user);
            }
        }

        console.log('\n=== Usuarios creados ===');
        console.log('1. Admin:   admin@pozoblanco.es   / admin123');
        console.log('2. Manager: manager@pozoblanco.es / manager123');
        console.log('3. User:    user@pozoblanco.es    / user123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
