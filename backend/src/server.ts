import 'reflect-metadata';
import app from './app';
import { env } from './config/environment';
import { logger } from './config/logger';
import { initializeDatabase } from './config/database';
import { connectRedis } from './config/redis';

const startServer = async () => {
    try {
        // Connect to Database
        await initializeDatabase();

        // Connect to Redis
        try {
            await connectRedis();
            logger.info('Redis Client Connected');
        } catch (err) {
            logger.warn('Redis connection failed (running without cache/rate-limiting):', err);
        }

        app.listen(env.port, () => {
            logger.info(`Server is running on port ${env.port} in ${env.nodeEnv} mode`);
            logger.info(`API Documentation available at /api-docs (if enabled)`);
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
