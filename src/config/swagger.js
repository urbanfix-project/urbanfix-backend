import path from 'node:path';
import { fileURLToPath } from 'node:url';
import swaggerJSDoc from 'swagger-jsdoc';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const sourceFiles = path.join(currentDirectory, '../**/*.js').replaceAll('\\', '/');

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'UrbanFix API',
      version: '1.0.0',
      description: 'Documentacion de la API REST de UrbanFix Solutions',
    },
    servers: [
      {
        url: '/',
        description: 'Servidor actual',
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
  },
  apis: [sourceFiles],
});

export default swaggerSpec;
