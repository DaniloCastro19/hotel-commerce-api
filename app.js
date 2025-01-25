import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import swaggerUi from 'swagger-ui-express';
import dbClient from "./src/data/dbClient.js";
import { swaggerSpec } from './src/config/swagger.js';
import httpErrorHandler from "./src/core/middlewares/errorHandler.js";
import hotelsRouter from "./src/api/routes/hotels.js";
import roomRoutes from "./src/api/routes/roomRoute.js";
import displayRoutes from "express-routemap";
import session from 'express-session';
import keycloak from './src/config/keycloak.js';
import userRoutes from './src/api/routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const API_PREFIX = "api"
const API_VERSION = "v1"


//Middlewares
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
// Swagger documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));

app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/hotels', hotelsRouter);

app.use(httpErrorHandler);

//Routes
app.use(`/${API_PREFIX}/${API_VERSION}/rooms`, roomRoutes); 
app.use(`/${API_PREFIX}/${API_VERSION}/hotels`, hotelsRouter);
app.use('/api/users', userRoutes);

// Configuración de sesión
app.use(session({
    secret: 'tu_secreto_aqui',
    resave: false,
    saveUninitialized: true,
    store: keycloak.memoryStore
}));

// Inicializar Keycloak
app.use(keycloak.middleware());

app.listen(PORT, () =>{
    displayRoutes(app);
    console.log(`App listening on http://localhost:${PORT}/${API_PREFIX}/${API_VERSION}` );
});


process.on('SIGINT', async ()=>{
  dbClient.closeConnection();
  process.exit(0);
});

export default {app};