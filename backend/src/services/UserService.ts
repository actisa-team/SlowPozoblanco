import { User } from '../entities/User.entity';
import { AppDataSource } from '../config/database';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async findAll(): Promise<User[]> {
        return this.userRepository.find({
            select: ['id', 'email', 'firstName', 'lastName', 'role', 'isActive', 'createdAt', 'lastLogin', 'phone', 'country', 'postalCode', 'age', 'gender']
        });
    }
}
