import {Router} from "express";
import { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom, filterRooms } from "../controllers/roomController.js";
import { validateBody, validateRoomType} from "../../core/utilities/validations/roomsValidations.js";
import { verifyToken, isAdmin } from '../../core/middlewares/authMiddleware.js';
import { filterExtraFields } from "../../core/middlewares/filterFileds.js";
const roomRoutes = Router();

const validFields = ['roomType', 'nBeds','pricePerNight'];

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - hotelId
 *         - roomNumber
 *         - userId
 *         - roomType
 *         - capacity
 *         - nBeds
 *         - available
 *         - pricePerNight
 * 
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: Auto-generated hotel ID
 *           example: "6791b530d1a99c3c3c34c1b5"
 *         hotelId:
 *           type: ObjectId
 *           description: ID of the hotel wich rooms belongs  
 *           example: "6791b530d1a99c3c3f34c1b5"
 *         roomNumber:
 *           type: string
 *           description: Room number in hotel
 *           example: "505"
 *         userId:
 *           type: ObjectId
 *           description: ID user owner of the room
 *           example: "6791b530d1a99c3c3c34c1b3"
 *         roomType:
 *           type: string
 *           description: Type of room choosed ([single, double, triple, suite, suite-family])
 *           example: "Single"
 *         capacity:
 *           type: integer
 *           minimum: 1
 *           maximum: 4
 *           description: Number of capacity of the room
 *           example: 4
 *         nBeds:
 *           type: integer
 *           minimum: 1
 *           maximum: 2
 *           description: Number of beds availables in the room
 *           example: 2
 *         available:
 *           type: bool
 *           description: Availability of the room
 *           example: true
 *         pricePerNight:
 *           type: float
 *           description: Price of the room per night
 *           example: 200
 */

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Rooms management endpoints
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of rooms retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
roomRoutes.get('/:hotelId/rooms', getAllRooms);

/**
 * @swagger
 * /rooms/search:
 *   get:
 *     summary: Search rooms by filters
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: capacity
 *         schema:
 *           type: integer
 *         description: Minimum capacity required
 *       - in: query
 *         name: roomType
 *         schema:
 *           type: string
 *         description: Type of room (single, double, triple, suite, suite-family)
 *       - in: query
 *         name: nBeds
 *         schema:
 *           type: integer
 *         description: Minimum number of beds required
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: integer
 *         description: Minimum price per night
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *         description: Maximum price per night
 *     responses:
 *       200:
 *         description: List of filtered rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       400:
 *         description: No filters provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
roomRoutes.get('/rooms/search', filterRooms);

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Get room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: ObjectId
 *         description: Room ID
 *         example: "6791b530d1a99c3c3c34c1b1"
 *     responses:
 *       200:
 *         description: Room found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
roomRoutes.get('/:hotelId/rooms/:id', getRoom);

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *           example:
 *             hotelId: "6711b530d1a99c3c3c34c1b5"
 *             roomNumber: "505"
 *             userId: "6791b530d1a99c3c3c34c1f4"
 *             roomType: "Single"
 *             capacity: 1
 *             nBeds: 1
 *             available: true
 *             pricePerNight: 200
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
roomRoutes.post('/:hotelId/rooms', verifyToken, isAdmin, filterExtraFields(validFields),validateBody,validateRoomType, createRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Update a room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: ObjectId
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *           example:
 *             hotelId: "6791b530d1a99c3c3c34c1f3"
 *             roomNumber: "200"
 *             userId: "6791b530d1a99c3c3c34c1k5"
 *             roomType: "Suite"
 *             capacity: 4
 *             nBeds: 2
 *             available: true
 *             pricePerNight: 300
 *     responses:
 *       200:
 *         description: Room updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 */
roomRoutes.put('/:hotelId/:roomId', verifyToken, isAdmin, filterExtraFields(validFields),validateBody, validateRoomType,updateRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Delete a Room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: ObjectId
 *         description: Room ID
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
 *                   example: "Room deleted successfully"
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
roomRoutes.delete('/:hotelId/rooms/:roomId', verifyToken, isAdmin, deleteRoom);

export default roomRoutes;
