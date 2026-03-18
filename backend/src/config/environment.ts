import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
    port: Number(process.env.PORT) || 3000,
    apiVersion: process.env.API_VERSION || 'v1',
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'pozoblanco_db',
        ssl: process.env.DB_SSL === 'true',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret-key',
        expiresIn: process.env.JWT_EXPIRATION || '15m',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
    },
    security: {
        bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 12,
        maxLoginAttempts: Number(process.env.MAX_LOGIN_ATTEMPTS) || 5,
        lockTimeMs: Number(process.env.LOCK_TIME_MS) || 900000, // 15 mins
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
    },
    log: {
        level: process.env.LOG_LEVEL || 'info',
        dir: process.env.LOG_DIR || './logs',
    }
};
