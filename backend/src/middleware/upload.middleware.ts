import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

const UPLOAD_BASE_DIR = process.env.UPLOAD_DIR 
    ? path.join(process.env.UPLOAD_DIR, 'tourism-resources')
    : path.join(__dirname, '../../uploads/tourism-resources');

// Límites de archivos
const FILE_LIMITS = {
    images: { maxCount: 5, maxSize: 5 * 1024 * 1024 }, // 5MB
    images360: { maxCount: 5, maxSize: 50 * 1024 * 1024 }, // 50MB
    videos: { maxCount: 2, maxSize: 1024 * 1024 * 1024 }, // 1GB
    videos360: { maxCount: 1, maxSize: 1024 * 1024 * 1024 }, // 1GB
};

// Formatos permitidos
const ALLOWED_MIMETYPES = {
    images: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    images360: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    videos: ['video/mp4', 'video/webm'],
    videos360: ['video/mp4', 'video/webm'],
};

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        const resourceId = req.params.id;
        const mediaType = req.body.mediaType || 'images'; // images, videos, videos360

        const uploadPath = path.join(UPLOAD_BASE_DIR, resourceId, mediaType);

        // Crear directorio si no existe
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        // Generar nombre único: timestamp-random-originalname
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        cb(null, `${basename}-${uniqueSuffix}${ext}`);
    }
});

// Filtro de archivos
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const mediaType = req.body.mediaType || 'images';
    const allowedTypes = ALLOWED_MIMETYPES[mediaType as keyof typeof ALLOWED_MIMETYPES];

    if (allowedTypes && allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Tipo de archivo no permitido. Para ${mediaType}, solo se permiten: ${allowedTypes?.join(', ')}`));
    }
};

// Middleware de upload
export const uploadMiddleware = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 1024, // Máximo 1GB (se validará por tipo después)
    }
});

// Helper para validar límites específicos por tipo
export const validateMediaLimits = (mediaType: string, fileCount: number, fileSize: number): void => {
    const limits = FILE_LIMITS[mediaType as keyof typeof FILE_LIMITS];

    if (!limits) {
        throw new Error(`Tipo de media no válido: ${mediaType}`);
    }

    if (fileCount > limits.maxCount) {
        throw new Error(`Máximo ${limits.maxCount} archivos permitidos para ${mediaType}`);
    }

    if (fileSize > limits.maxSize) {
        throw new Error(`Tamaño máximo excedido para ${mediaType}: ${limits.maxSize / (1024 * 1024)}MB`);
    }
};

// Helper para eliminar archivos
export const deleteMediaFile = (resourceId: string, mediaType: string, filename: string): void => {
    const filePath = path.join(UPLOAD_BASE_DIR, resourceId, mediaType, filename);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

// Helper para eliminar todos los archivos de un recurso
export const deleteAllResourceMedia = (resourceId: string): void => {
    const resourcePath = path.join(UPLOAD_BASE_DIR, resourceId);

    if (fs.existsSync(resourcePath)) {
        fs.rmSync(resourcePath, { recursive: true, force: true });
    }
};
