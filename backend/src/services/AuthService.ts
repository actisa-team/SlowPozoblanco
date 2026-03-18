import { User } from '../entities/User.entity';
import { AppDataSource } from '../config/database';
import { RegisterDto, LoginDto } from '../dtos/Auth.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/environment';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async register(data: RegisterDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { email: data.email } });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, env.security.bcryptRounds);
        const user = this.userRepository.create({
            ...data,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }

    async login(data: LoginDto) {
        const user = await this.userRepository.findOne({ where: { email: data.email }, select: ['id', 'email', 'password', 'role', 'firstName', 'lastName', 'phone', 'country', 'postalCode', 'age', 'gender'] });

        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            env.jwt.secret as jwt.Secret,
            { expiresIn: env.jwt.expiresIn as jwt.SignOptions['expiresIn'] }
        );

        const refreshToken = jwt.sign(
            { userId: user.id },
            env.jwt.refreshSecret as jwt.Secret,
            { expiresIn: env.jwt.refreshExpiresIn as jwt.SignOptions['expiresIn'] }
        );

        // Update last login
        user.lastLogin = new Date();
        await this.userRepository.save(user);

        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token, refreshToken };
    }
}
