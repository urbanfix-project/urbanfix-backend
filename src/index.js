import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api-docs.json', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(200).json(swaggerSpec);
});

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

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Verifica el estado del servidor
 *     tags:
 *       - Sistema
 *     responses:
 *       200:
 *         description: El servidor esta funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
app.get('/health', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
