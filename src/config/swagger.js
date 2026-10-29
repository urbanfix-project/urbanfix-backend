import path from 'node:path';
import { fileURLToPath } from 'node:url';
import swaggerJSDoc from 'swagger-jsdoc';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const docsPath = path.join(currentDirectory, '../docs').replaceAll('\\', '/');

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'UrbanFix API',
      version: '1.0.0',
      description: 'Endpoints implementados del MVP UrbanFix. Los módulos pendientes se incorporarán cuando estén disponibles.',
    },
    servers: [{ url: '/', description: 'Servidor actual' }],
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
  apis: [
    `${docsPath}/auth.swagger.js`,
    `${docsPath}/user.swagger.js`,
    `${docsPath}/serviceRequest.swagger.js`,
  ],
});

export default swaggerSpec;
