import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const CONNECTION_STRING = process.env.CONNECTION_STRING;
class DatabaseClient {
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(CONNECTION_STRING);
            console.log('Connected to MongoDB');
            
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    }

    async closeConnection() {
        try {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
        } catch (error) {
            console.error('Error closing MongoDB connection:', error);
        }
    }
}

export default new DatabaseClient();