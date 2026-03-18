import { User } from '../entities/User.entity';
import { AppDataSource } from '../config/database';
import type { UpdateUserDto } from '../dtos/User.dto';
import bcrypt from 'bcrypt';
import { env } from '../config/environment';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async findAll(): Promise<User[]> {
        return this.userRepository.find({
            select: ['id', 'email', 'firstName', 'lastName', 'role', 'isActive', 'createdAt', 'lastLogin', 'phone', 'country', 'postalCode', 'age', 'gender']
        });
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new Error('Usuario no encontrado');

        if (data.password) {
            data.password = await bcrypt.hash(data.password, env.security.bcryptRounds);
        }

        Object.assign(user, data);
        return this.userRepository.save(user);
    }

    async delete(id: string): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) throw new Error('Usuario no encontrado');
    }
}
