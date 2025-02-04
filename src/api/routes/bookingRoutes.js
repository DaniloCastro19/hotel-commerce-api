import express from 'express';
import { createBooking, getBookings, getBookingById, cancelBooking, getAllUserBooking } from '../controllers/bookingController.js';
import { verifyToken, isAdmin } from '../../core/middlewares/authMiddleware.js';

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
router.post('/', verifyToken, createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Obtener todas las reservas (Solo Admin)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las reservas
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Solo administradores
 */
router.get('/', verifyToken, isAdmin, getBookings);

/**
 * @swagger
 * /api/bookings/hotel/{hotelId}:
 *   get:
 *     summary: Obtener reservas de un hotel específico (Solo Admin)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hotel
 *     responses:
 *       200:
 *         description: Lista de reservas del hotel
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Solo administradores
 */
router.get('/hotel/:hotelId', verifyToken, isAdmin, getBookingById);

/**
 * @swagger
 * /api/bookings/user:
 *   get:
 *     summary: Obtener las reservas del usuario autenticado
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario
 *       401:
 *         description: No autorizado
 */
router.get('/user', verifyToken, getAllUserBooking);

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
router.delete('/:id', verifyToken, cancelBooking);

export default router;
