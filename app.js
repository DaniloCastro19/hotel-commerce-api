import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import swaggerUi from 'swagger-ui-express';
import dbClient from "./src/data/dbClient.js";
import { swaggerSpec } from './swagger.js';
import httpErrorHandler from "./src/core/middlewares/errorHandler.js";
import hotelsRouter from "./src/api/routes/hotelsRoutes.js";
import roomRoutes from "./src/api/routes/roomRoute.js";
import userRoutes from './src/api/routes/userRoutes.js';
import bookingRoutes from './src/api/routes/bookingRoutes.js';
import displayRoutes from "express-routemap";
import session from 'express-session';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const API_PREFIX = "api"

app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
  
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));

app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use(session({
    secret: 'tu_secreto_aqui',
    resave: false,
    saveUninitialized: true,
}));

app.use(httpErrorHandler);

const apiRouter = express.Router();

apiRouter.use('/users', userRoutes);
apiRouter.use('/hotel', roomRoutes);
apiRouter.use('/hotels', hotelsRouter);
apiRouter.use('/bookings', bookingRoutes);

app.use(`/${API_PREFIX}`, apiRouter);

app.listen(PORT, () =>{
    displayRoutes(app);
    console.log(`App listening on http://localhost:${PORT}/${API_PREFIX}` );
});

process.on('SIGINT', async ()=>{
    dbClient.closeConnection();
    process.exit(0);
});

export default {app};