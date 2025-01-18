import swaggerJSDoc from 'swagger-jsdoc';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Hotels API',
    version: '1.0.0',
    description: 'API for managing hotels and their rooms',
    contact: {
      name: 'API Support',
      email: 'support@example.com'
    }
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: 'Development server'
    }
  ],
  components: {
    schemas: {
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          timestamp: {
            type: 'string',
            format: 'date-time'
          },
          statusCode: {
            type: 'integer'
          },
          errorMessage: {
            type: 'string'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/api/controllers/*.js']
};

export const swaggerSpec = swaggerJSDoc(options); 