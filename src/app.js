import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import apiRoutes from './api.routes.js';

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Swagger documentation route
app.get('/api-docs.json', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(200).json(swaggerSpec);
});

// Swagger UI route
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'UrbanFix API Docs',
    swaggerOptions: {
      displayRequestDuration: true,
    },
  }),
);

//Ruta Health Check
app.get('/health', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(200).json({ status: 'ok' });
});

// API routes
app.use('/api', apiRoutes);

export default app;
