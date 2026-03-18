import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, message?: string) => {
    return res.status(200).json({
        success: true,
        message,
        data,
        meta: {
            timestamp: new Date().toISOString(),
            version: '1.0',
        },
    });
};

export const sendCreated = (res: Response, data: any, message?: string) => {
    return res.status(201).json({
        success: true,
        message,
        data,
        meta: {
            timestamp: new Date().toISOString(),
            version: '1.0',
        },
    });
};
