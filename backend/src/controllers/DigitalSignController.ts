import { Request, Response, NextFunction } from 'express';
import { DigitalSignService } from '../services/DigitalSignService';
import { sendSuccess } from '../utils/responses';

export class DigitalSignController {
    private service = new DigitalSignService();

    /**
     * Recupera todos los carteles digitales.
     * 
     * @param req - Objeto Request de Express.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signs = await this.service.findAll();
            sendSuccess(res, signs);
        } catch (error) {
            next(error);
        }
    };

    /**
     * Recupera estadísticas de los carteles digitales.
     * 
     * @param req - Objeto Request de Express.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    getStats = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stats = await this.service.getStats();
            sendSuccess(res, stats);
        } catch (error) {
            next(error);
        }
    };
}
