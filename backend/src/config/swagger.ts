import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './environment';

import path from 'path';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pozoblanco Slow Turismo API',
            version: '1.0.0',
            description: 'API REST for Smart City Tourism Management in Pozoblanco',
            contact: {
                name: 'Ayuntamiento de Pozoblanco',
                email: 'turismo@pozoblanco.es',
            },
        },
        servers: [
            {
                url: `http://localhost:${env.port}/${env.apiVersion}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        path.join(__dirname, '../routes/*.ts'),
        path.join(__dirname, '../controllers/*.ts'),
        path.join(__dirname, '../dtos/*.ts'),
        path.join(__dirname, '../entities/*.ts')
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
