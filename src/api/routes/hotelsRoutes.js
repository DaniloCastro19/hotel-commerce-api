import { Router } from 'express';
import { HotelsController } from '../controllers/hotelsController.js';
import { validateBody } from '../../core/utilities/validations/hotelsValidations.js';
import { verifyToken, isAdmin } from '../../core/middlewares/authMiddleware.js';
import { filterExtraFields } from '../../core/middlewares/filterFileds.js';

const allowedFields = ["name", 'location', 'rating', 'totalRooms', 'roomTypes', 'averagePricePerNight', 'promotions']

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       required:
 *         - name
 *         - location
 *         - totalRooms
 *         - roomTypes
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: Auto-generated hotel ID
 *           example: 679306bb8d6e09575152eb21
 *         name:
 *           type: string
 *           description: Hotel name
 *           example: "Grand Hotel"
 *         location:
 *           type: string
 *           description: Hotel location
 *           example: "Downtown"
 *         rating:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           description: Hotel rating (0-5)
 *           example: 4.5
 *         totalRooms:
 *           type: integer
 *           minimum: 1
 *           description: Total number of rooms
 *           example: 100
 *         roomsAvailable:
 *           type: integer
 *           minimum: 0
 *           description: Number of available rooms
 *           example: 90
 *         roomTypes:
 *           type: array
 *           items:
 *             type: string
 *             enum: [single, double, triple, suite, suite-family]
 *           description: Available room types
 *           example: ["single", "double", "suite"]
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *           description: Hotel amenities
 *           example: ["pool", "spa", "gym"]
 */

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Hotel management endpoints
 */

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Get all hotels
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: List of hotels retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', HotelsController.getAllHotels);

/**
 * @swagger
 * /hotels/{id}:
 *   get:
 *     summary: Get hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: ObjectId
 *         description: Hotel ID
 *         example: 679306bb8d6e09575152eb21
 *     responses:
 *       200:
 *         description: Hotel found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: Hotel not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', HotelsController.getHotelById);

/**
 * @swagger
 * /hotels:
 *   post:
 *     summary: Create a new hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *           example:
 *             name: "New Hotel"
 *             location: "Beach Front"
 *             rating: 4.5
 *             totalRooms: 120
 *             roomsAvailable: 100
 *             roomTypes: ["single", "double", "suite"]
 *             amenities: ["pool", "beach access"]
 *     responses:
 *       201:
 *         description: Hotel created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', verifyToken, isAdmin, filterExtraFields(allowedFields),validateBody, HotelsController.createHotel);

/**
 * @swagger
 * /hotels/{id}:
 *   put:
 *     summary: Update a hotel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: ObjectId
 *         description: Hotel ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *           example:
 *             name: "Updated Hotel Name"
 *             rating: 4.8
 *             roomsAvailable: 95
 *     responses:
 *       200:
 *         description: Hotel updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: Hotel not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', verifyToken, isAdmin, validateBody, HotelsController.updateHotel);

/**
 * @swagger
 * /hotels/{id}:
 *   delete:
 *     summary: Delete a hotel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: ObjectId
 *         description: Hotel ID
 *     responses:
 *       200:
 *         description: Hotel deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hotel deleted successfully"
 *       404:
 *         description: Hotel not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', verifyToken, isAdmin, HotelsController.deleteHotel);

export default router;
