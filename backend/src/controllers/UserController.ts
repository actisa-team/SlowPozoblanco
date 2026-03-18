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

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.update(req.params.id, req.body);
            sendSuccess(res, user, 'Usuario actualizado');
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.userService.delete(req.params.id);
            sendSuccess(res, null, 'Usuario eliminado con éxito');
        } catch (error) {
            next(error);
        }
    };
}
