import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/config/swagger.js';
import httpErrorHandler from "./src/core/middlewares/errorHandler.js";
import hotelsRouter from "./src/routes/hotels.js";
import roomRoutes from "./src/api/routes/roomRoute.js";
import displayRoutes from "express-routemap";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const API_PREFIX = "api"
const API_VERSION = "v1"


//Middlewares
app.use(express.json())
app.use(cors());
app.use(httpErrorHandler);

//Routes
app.use(`/${API_PREFIX}/${API_VERSION}/rooms`, roomRoutes); 

app.listen(PORT, () =>{
    displayRoutes(app);
    console.log("App listening on port" , PORT);

    
});

export default {app};