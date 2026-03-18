import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    logger.error(`[${req.method}] ${req.url} >> StatusCode:: ${status}, Message:: ${message}`, { stack: err.stack });

    res.status(status).json({
        success: false,
        error: {
            code: err.code || 'INTERNAL_SERVER_ERROR',
            message,
            details: env.isDev ? err : undefined,
        },
    });
};

import { env } from '../config/environment';
