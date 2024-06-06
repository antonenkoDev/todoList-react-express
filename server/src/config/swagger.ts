import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import logger from '../logger';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/api/*.ts', './src/controllers/*.ts'], // Путь к файлам с аннотациями Swagger
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    logger.info('Swagger docs available at /api-docs');
  }
};
