import { User } from '../entities/User.entity';
import { AppDataSource } from '../config/database';
import { RegisterDto, LoginDto } from '../dtos/Auth.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/environment';
import { EmailService } from './EmailService';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);
    private emailService = new EmailService();

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

    async forgotPassword(email: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            // No revelamos si el usuario existe o no, simplemente volvemos
            return;
        }

        // Generar token seguro
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        // Guardar token y fecha de expiración (1 hora)
        user.resetPasswordToken = await bcrypt.hash(resetToken, env.security.bcryptRounds);
        
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        user.resetPasswordExpires = expirationDate;
        
        await this.userRepository.save(user);

        // Generar URL para frontend
        const frontendUrl = env.isProd 
            ? 'https://pozoblanco.es' // Reemplazar con URL real en prod
            : 'http://localhost:5173';
        const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

        // Enviar email
        await this.emailService.sendPasswordResetEmail(user.email, resetUrl);
    }

    async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
        const user = await this.userRepository.findOne({ 
            where: { email },
            select: ['id', 'resetPasswordToken', 'resetPasswordExpires']
        });

        if (!user || !user.resetPasswordToken || !user.resetPasswordExpires) {
            throw new Error('Token inválido o expirado');
        }

        // Verificar expiración
        if (new Date() > user.resetPasswordExpires) {
            throw new Error('El token de recuperación ha expirado');
        }

        // Verificar validez del token
        const isValid = await bcrypt.compare(token, user.resetPasswordToken);
        if (!isValid) {
            throw new Error('Token inválido o expirado');
        }

        // Actualizar contraseña
        user.password = await bcrypt.hash(newPassword, env.security.bcryptRounds);
        
        // Limpiar tokens de recuperación
        user.resetPasswordToken = null as unknown as string; // O hacky si no acepta null con exactOptionalPropertyTypes
        user.resetPasswordExpires = null as unknown as Date;
        
        await this.userRepository.save(user);
    }
}
