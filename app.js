import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import httpErrorHandler from "./src/core/middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(express.json())
app.use(cors());
app.use(httpErrorHandler)

app.listen(PORT, () =>{
    console.log("App listening on port" , PORT);
    
});
