import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(express.json())
app.use(cors());


app.listen(PORT, () =>{
    console.log("App listening on port" , PORT);
    
});