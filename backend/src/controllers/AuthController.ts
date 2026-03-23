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

    /**
     * Solicita la recuperación de contraseña enviando un enlace al correo.
     */
    forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ success: false, message: 'Email es requerido' });
            }
            await this.authService.forgotPassword(email);
            // Siempre enviamos éxito para no revelar si el email existe o no
            sendSuccess(res, null, 'Si existe una cuenta con ese correo, recibirás un enlace de recuperación');
        } catch (error) {
            next(error);
        }
    };

    /**
     * Restablece la contraseña usando el token.
     */
    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, token, newPassword } = req.body;
            if (!email || !token || !newPassword) {
                return res.status(400).json({ success: false, message: 'Faltan parámetros requeridos' });
            }
            await this.authService.resetPassword(email, token, newPassword);
            sendSuccess(res, null, 'Contraseña actualizada correctamente');
        } catch (error) {
            next(error);
        }
    };
}
