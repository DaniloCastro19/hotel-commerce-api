import 'dotenv/config'
import { MongoClient } from "mongodb";
import mongoose from 'mongoose';


 class dbClient{
    constructor(){
        this.connect();
    }
    
    async connect(){
        try{
            const queryString = process.env.CONNECTION_STRING;
            
            await mongoose.connect(queryString);
            this.client = new MongoClient(queryString);
            console.log('Successfull connection with database.');            
        }catch (e){
            console.error(e);
        }
    }


    async closeConnection() {
        try{
            await mongoose.disconnect();
            console.log("Successfull disconnection with Database");
            
        }catch (e){
            console.error('Error closing connection with database.',e);
        }
    }
}

export default new dbClient();