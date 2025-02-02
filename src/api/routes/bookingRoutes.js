import express from 'express';
import { createBooking, getBookings, getBookingById, cancelBooking } from '../controllers/bookingController.js';
import { verifyToken } from '../../core/middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startReservationDate
 *               - endReservationDate
 *               - userID
 *               - hotelID
 *               - roomID
 *             properties:
 *               startReservationDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la reserva
 *               endReservationDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin de la reserva
 *               userID:
 *                 type: string
 *                 description: ID del usuario que realiza la reserva
 *               hotelID:
 *                 type: string
 *                 description: ID del hotel
 *               roomID:
 *                 type: string
 *                 description: ID de la habitación
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       400:
 *         description: Datos inválidos o habitación no disponible
 *       401:
 *         description: No autorizado
 */
router.post('/bookings', verifyToken, createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   startReservationDate:
 *                     type: string
 *                     format: date
 *                   endReservationDate:
 *                     type: string
 *                     format: date
 *                   totalPrice:
 *                     type: number
 *                   status:
 *                     type: string
 *                     enum: [pending, confirmed, cancelled]
 */
router.get('/bookings', verifyToken, getBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Detalles de la reserva
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/bookings/:id', verifyToken, getBookingById);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Cancelar una reserva
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a cancelar
 *     responses:
 *       200:
 *         description: Reserva cancelada exitosamente
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/bookings/:id', verifyToken, cancelBooking);

export default router;
