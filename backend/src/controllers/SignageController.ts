import { Request, Response, NextFunction } from 'express';
import { SignageService } from '../services/SignageService';
import { sendSuccess, sendCreated } from '../utils/responses';

export class SignageController {
    private service = new SignageService();

    /**
     * Recupera todos los dispositivos de señalización.
     * 
     * @param req - Objeto Request de Express.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try { sendSuccess(res, await this.service.findAll()); } catch (e) { next(e); }
    };

    /**
     * Recupera un dispositivo de señalización específico por ID.
     * 
     * @param req - Objeto Request de Express que contiene el ID en params.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try { sendSuccess(res, await this.service.findOne(req.params.id)); } catch (e) { next(e); }
    };

    /**
     * Crea un nuevo dispositivo de señalización.
     * 
     * @param req - Objeto Request de Express que contiene los datos del dispositivo en el body.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    create = async (req: Request, res: Response, next: NextFunction) => {
        try { sendCreated(res, await this.service.create(req.body)); } catch (e) { next(e); }
    };

    /**
     * Actualiza un dispositivo de señalización existente.
     * 
     * @param req - Objeto Request de Express que contiene el ID en params y los datos de actualización en el body.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    update = async (req: Request, res: Response, next: NextFunction) => {
        try { sendSuccess(res, await this.service.update(req.params.id, req.body)); } catch (e) { next(e); }
    };

    /**
     * Elimina un dispositivo de señalización.
     * 
     * @param req - Objeto Request de Express que contiene el ID en params.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try { await this.service.delete(req.params.id); sendSuccess(res, null, 'Deleted'); } catch (e) { next(e); }
    };

    /**
     * Procesa una señal de latido (heartbeat) de un dispositivo.
     * 
     * @param req - Objeto Request de Express que contiene deviceId en params.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    heartbeat = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.heartbeat(req.params.deviceId); // Assuming deviceId is passed or id
            if (!result) throw { status: 404, message: 'Device not found' };
            sendSuccess(res, result);
        } catch (e) { next(e); }
    };
}
