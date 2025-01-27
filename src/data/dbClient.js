import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/test';

class DatabaseClient {
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(CONNECTION_STRING);
            console.log('Connected to MongoDB');

            // Eliminar la colección users si existe y recrearla
            await mongoose.connection.db.dropCollection('users').catch(() => {
                console.log('Collection users does not exist yet');
            });
            
            console.log('Database reset completed');
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