import swaggerJSDoc from 'swagger-jsdoc';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const API_PREFIX = "api"

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Booking API',
    version: '1.0.0',
    description: 'API for managing hotels, rooms and users',
    contact: {
      name: 'Team 007',
      email: 'support@example.com'
    }
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api`,
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
      },
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'User ID'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email'
          },
          nickname: {
            type: 'string',
            description: 'User nickname'
          },
          firstName: {
            type: 'string',
            description: 'User first name'
          },
          lastName: {
            type: 'string',
            description: 'User last name'
          },
          roles: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['admin', 'user', 'unlogged']
            },
            description: 'User roles (default: unlogged)',
            default: ['unlogged']
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation date'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update date'
          }
        }
      },
      UserResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User ID'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email'
          },
          nickname: {
            type: 'string',
            description: 'User nickname'
          },
          firstName: {
            type: 'string',
            description: 'User first name'
          },
          lastName: {
            type: 'string',
            description: 'User last name'
          },
          roles: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['admin', 'user', 'unlogged']
            },
            description: 'User roles'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: [
    './src/api/routes/*.js',
    './src/data/json/*.json'
  ]
};

export const swaggerSpec = swaggerJSDoc(options); 