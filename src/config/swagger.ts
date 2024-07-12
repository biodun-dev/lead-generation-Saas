import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lead Generation API',
      version: '1.0.0',
      description: 'API documentation for the Lead Generation application',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Change this to your server's URL
      },
    ],
  },
  apis: ['./src/config/swaggerDocs.js'], // Path to the documentation file
};

const specs = swaggerJsdoc(options);

export default (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
