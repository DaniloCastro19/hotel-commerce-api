import {Router} from "express";
import { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom } from "../controllers/roomController.js";
const roomRoutes = Router();

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
 *           type: string
 *           description: Auto-generated hotel ID
 *           example: "1"
 *         hotelId:
 *           type: string
 *           description: ID of the hotel wich rooms belongs  
 *           example: "1"
 *         roomNumber:
 *           type: string
 *           description: Room number in hotel
 *           example: "505"
 *         userId:
 *           type: string
 *           description: ID user owner of the room
 *           example: "1"
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
roomRoutes.get('/', getAllRooms);

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
 *           type: string
 *         description: Room ID
 *         example: "1"
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
roomRoutes.get('/:id', getRoom);

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
 *             hotelId: "1"
 *             roomNumber: "505"
 *             userId: "1"
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
 */
roomRoutes.post('/', createRoom);

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
 *           type: string
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *           example:
 *             hotelId: "1"
 *             roomNumber: "200"
 *             userId: "1"
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
 */
roomRoutes.put('/:id', updateRoom);

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
 *           type: string
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
roomRoutes.delete('/:id', deleteRoom);

export default roomRoutes;