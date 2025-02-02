import { Router } from 'express';
import { BookingController } from '../controllers/bookingController.js';
import { verifyToken, isUser } from '../../core/middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - roomId
 *         - checkInDate
 *         - checkOutDate
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated booking ID
 *           example: "6791b530d1a99c3c3c34c1b5"
 *         userId:
 *           type: string
 *           description: ID of the user making the booking
 *           example: "6791b530d1a99c3c3c34c1b3"
 *         roomId:
 *           type: string
 *           description: ID of the room being booked
 *           example: "6791b530d1a99c3c3c34c1b4"
 *         checkInDate:
 *           type: string
 *           format: date
 *           description: Check-in date
 *           example: "2024-04-01"
 *         checkOutDate:
 *           type: string
 *           format: date
 *           description: Check-out date
 *           example: "2024-04-05"
 *         totalPrice:
 *           type: number
 *           description: Total price for the booking
 *           example: 800
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *           description: Booking status
 *           example: "confirmed"
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
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
 *               - roomId
 *               - checkInDate
 *               - checkOutDate
 *             properties:
 *               roomId:
 *                 type: string
 *                 example: "6791b530d1a99c3c3c34c1b4"
 *               checkInDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-01"
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-05"
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid input or dates
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 */
router.post('/', verifyToken, isUser, BookingController.createBooking);

/**
 * @swagger
 * /bookings/all:
 *   get:
 *     summary: Get all bookings (Admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 */
router.get('/all', verifyToken, isUser, BookingController.getAllBookings);

/**
 * @swagger
 * /bookings/my-bookings:
 *   get:
 *     summary: Get user's bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 */
router.get('/my-bookings', verifyToken, isUser, BookingController.getUserBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.get('/:id', verifyToken, isUser, BookingController.getBookingById);

/**
 * @swagger
 * /bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.patch('/:id/cancel', verifyToken, isUser, BookingController.cancelBooking);

export default router; 