import { DataSource } from 'typeorm';
import { env } from './environment';
import { logger } from './logger';
import path from 'path';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    synchronize: env.isDev, // CAUTION: True only in dev. In prod use migrations.
    logging: false,
    entities: [path.join(__dirname, '../entities/**/*.{ts,js}')],
    migrations: [path.join(__dirname, '../migrations/**/*.{ts,js}')],
    subscribers: [],
    ssl: env.db.ssl ? { rejectUnauthorized: false } : false,
});

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        logger.info('Data Source has been initialized!');
    } catch (err) {
        logger.error('Error during Data Source initialization:', err);
        process.exit(1);
    }
};
