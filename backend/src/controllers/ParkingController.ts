import { Request, Response, NextFunction } from 'express';
import { ParkingService } from '../services/ParkingService';
import { sendSuccess, sendCreated } from '../utils/responses';

export class ParkingController {
    private service = new ParkingService();

    /**
     * Recupera todas las plazas de aparcamiento.
     * 
     * @param req - Objeto Request de Express.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try { sendSuccess(res, await this.service.findAll()); } catch (e) { next(e); }
    };

    /**
     * Recupera una plaza de aparcamiento específica por ID.
     * 
     * @param req - Objeto Request de Express que contiene el ID en params.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try { sendSuccess(res, await this.service.findOne(req.params.id)); } catch (e) { next(e); }
    };

    /**
     * Crea una nueva plaza de aparcamiento.
     * 
     * @param req - Objeto Request de Express que contiene los datos del aparcamiento en el body.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    create = async (req: Request, res: Response, next: NextFunction) => {
        try { sendCreated(res, await this.service.create(req.body)); } catch (e) { next(e); }
    };

    /**
     * Actualiza el estado del sensor de una plaza de aparcamiento.
     * 
     * @param req - Objeto Request de Express que contiene el ID en params y el estado isOccupied en el body.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    updateSensor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { isOccupied } = req.body;
            const result = await this.service.updateSensor(req.params.id, isOccupied);
            if (!result) throw { status: 404, message: 'Parking space not found' };
            sendSuccess(res, result);
        } catch (e) { next(e); }
    };

    /**
     * Obtiene la disponibilidad general del aparcamiento.
     * 
     * @param req - Objeto Request de Express.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    getAvailability = async (req: Request, res: Response, next: NextFunction) => {
        try { sendSuccess(res, await this.service.getAvailability()); } catch (e) { next(e); }
    };
}
