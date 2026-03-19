import { Request, Response, NextFunction } from 'express';
import { TourismResourceService } from '../services/TourismResourceService';
import { sendSuccess, sendCreated } from '../utils/responses';
import { deleteMediaFile, deleteAllResourceMedia } from '../middleware/upload.middleware';

export class TourismResourceController {
    private service = new TourismResourceService();

    /**
     * Recupera todos los recursos turísticos.
     * 
     * @param req - Objeto Request de Express que contiene filtros de consulta.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.findAll(req.query);
            sendSuccess(res, result);
        } catch (error) { next(error); }
    };

    /**
     * Recupera un recurso turístico específico por ID.
     * 
     * @param req - Objeto Request de Express que contiene el ID en params.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.findOne(req.params.id);
            if (!result) throw { status: 404, message: 'Tourism Resource not found' };
            sendSuccess(res, result);
        } catch (error) { next(error); }
    };

    /**
     * Crea un nuevo recurso turístico.
     * 
     * @param req - Objeto Request de Express que contiene los datos del recurso en el body.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('REACHED BACKEND CREATE:', req.body);
            const result = await this.service.create(req.body);
            console.log('CREATED RESOURCE SUCCESSFULLY:', result);
            sendCreated(res, result);
        } catch (error) { 
            console.error('ERROR IN CREATE:', error);
            next(error); 
        }
    };

    /**
     * Actualiza un recurso turístico existente.
     * 
     * @param req - Objeto Request de Express que contiene el ID en params y los datos de actualización en el body.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.update(req.params.id, req.body);
            if (!result) throw { status: 404, message: 'Tourism Resource not found' };
            sendSuccess(res, result);
        } catch (error) { next(error); }
    };

    /**
     * Elimina un recurso turístico.
     * 
     * @param req - Objeto Request de Express que contiene el ID en params.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.service.delete(req.params.id);
            // Eliminar todos los archivos multimedia asociados
            deleteAllResourceMedia(req.params.id);
            sendSuccess(res, null, 'Tourism Resource deleted');
        } catch (error) { next(error); }
    };

    /**
     * Encuentra recursos turísticos cercanos a una ubicación.
     * 
     * @param req - Objeto Request de Express que contiene lat, lng y radius en la consulta.
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    getNearby = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { lat, lng, radius } = req.query;
            if (!lat || !lng) throw { status: 400, message: 'Latitude and longitude required' };

            const result = await this.service.findNearby(
                Number(lat),
                Number(lng),
                Number(radius) || 1000
            );
            sendSuccess(res, result);
        } catch (error) { next(error); }
    };

    /**
     * Sube archivos multimedia para un recurso turístico.
     * 
     * @param req - Request con archivos y mediaType (images, videos, videos360)
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    uploadMedia = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { mediaType } = req.body;
            const files = req.files as Express.Multer.File[];

            if (!files || files.length === 0) {
                throw { status: 400, message: 'No files uploaded' };
            }

            // Obtener el recurso actual
            const resource = await this.service.findOne(id);
            if (!resource) throw { status: 404, message: 'Tourism Resource not found' };

            // Generar paths relativos
            const filePaths = files.map(file =>
                `uploads/tourism-resources/${id}/${mediaType}/${file.filename}`
            );

            // Actualizar media del recurso
            const currentMedia = resource.media || {};
            const updatedMedia = {
                ...currentMedia,
                [mediaType]: [...(currentMedia[mediaType as keyof typeof currentMedia] || []), ...filePaths]
            };

            const updated = await this.service.update(id, { media: updatedMedia });
            sendSuccess(res, updated, 'Media uploaded successfully');
        } catch (error) { next(error); }
    };

    /**
     * Elimina un archivo multimedia específico.
     * 
     * @param req - Request con resourceId, mediaType y filename
     * @param res - Objeto Response de Express.
     * @param next - Middleware NextFunction de Express.
     */
    deleteMedia = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, filename } = req.params;
            const { mediaType } = req.body;

            const resource = await this.service.findOne(id);
            if (!resource) throw { status: 404, message: 'Tourism Resource not found' };

            // Eliminar archivo del sistema
            deleteMediaFile(id, mediaType, filename);

            // Actualizar media en DB
            const currentMedia = resource.media || {};
            const mediaArray = currentMedia[mediaType as keyof typeof currentMedia] || [];
            const filePath = `uploads/tourism-resources/${id}/${mediaType}/${filename}`;

            const updatedMediaArray = mediaArray.filter(path => path !== filePath);
            const updatedMedia = {
                ...currentMedia,
                [mediaType]: updatedMediaArray
            };

            const updated = await this.service.update(id, { media: updatedMedia });
            sendSuccess(res, updated, 'Media deleted successfully');
        } catch (error) { next(error); }
    };
}
