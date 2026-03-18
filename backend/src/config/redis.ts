import { createClient } from 'redis';
import { env } from './environment';
import { logger } from './logger';

export const redisClient = createClient({
    url: `redis://${env.redis.password ? `:${env.redis.password}@` : ''}${env.redis.host}:${env.redis.port}`,
    socket: {
        reconnectStrategy: false,
        connectTimeout: 2000
    }
});

redisClient.on('error', (err) => logger.error('Redis Client Error', err));
redisClient.on('connect', () => logger.info('Redis Client Connected'));

export const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};
