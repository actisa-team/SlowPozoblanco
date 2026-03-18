import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { sendSuccess, sendCreated } from '../utils/responses';

export class AuthController {
    private authService = new AuthService();

    /**
     * Registra un nuevo usuario.
     * 
     * @param req - Objeto Request de Express que contiene los datos de registro en el body.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.authService.register(req.body);
            sendCreated(res, user, 'User registered successfully');
        } catch (error) {
            next(error);
        }
    };

    /**
     * Autentica a un usuario y devuelve un token.
     * 
     * @param req - Objeto Request de Express que contiene las credenciales de inicio de sesión.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.login(req.body);
            sendSuccess(res, result, 'Login successful');
        } catch (error) {
            next(error);
        }
    };
}
