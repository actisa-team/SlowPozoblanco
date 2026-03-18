import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { sendSuccess } from '../utils/responses';

export class UserController {
    private userService = new UserService();

    /**
     * Recupera todos los usuarios.
     * 
     * @param req - Objeto Request de Express.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.findAll();
            sendSuccess(res, users);
        } catch (error) {
            next(error);
        }
    };
}
