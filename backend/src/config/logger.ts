import winston from 'winston';
import { env } from './environment';
import path from 'path';

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
        return `[${timestamp}] [${level.toUpperCase()}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''
            } ${stack ? '\n' + stack : ''}`;
    })
);

const transports: winston.transport[] = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            logFormat
        ),
    }),
];

if (env.isProd) {
    const logDir = env.log.dir;
    transports.push(
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error', format: logFormat }),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log'), format: logFormat })
    );
}

export const logger = winston.createLogger({
    level: env.log.level,
    transports,
});
