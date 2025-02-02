import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './data/json/usersSwagger.json' assert { type: "json" };

// Importar rutas
import userRoutes from './api/routes/userRoutes.js';
import hotelRoutes from './api/routes/hotels.js';
import roomRoutes from './api/routes/roomRoute.js';
import bookingRoutes from './api/routes/bookingRoutes.js';

// Configuración de dotenv
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// Manejo de errores básico
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

export default app; 