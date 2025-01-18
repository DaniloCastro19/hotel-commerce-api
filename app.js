import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/config/swagger.js';
import httpErrorHandler from "./src/core/middlewares/errorHandler.js";
import hotelsRouter from "./src/routes/hotels.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    url: `http://localhost:${PORT}/api-docs/swagger.json`,
    persistAuthorization: true
  }
}));

app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/hotels', hotelsRouter);

app.use(httpErrorHandler);

app.listen(PORT, () => {
    console.log("App listening on port", PORT);
});
