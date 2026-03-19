import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/environment';
import { errorMiddleware } from './middlewares/errorHandler';
import routes from './routes';
import path from 'path';

const app = express();

// Security Headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Policy
app.use(cors({
    origin: env.cors.origin,
    credentials: true
}));

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static Files - Serve uploaded media
const uploadDir = process.env.UPLOAD_DIR 
    ? process.env.UPLOAD_DIR
    : path.join(__dirname, '../../uploads');
app.use('/uploads', express.static(uploadDir));

// Routes
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(`/${env.apiVersion}`, routes);


// Global Error Handling
app.use(errorMiddleware);

export default app;
