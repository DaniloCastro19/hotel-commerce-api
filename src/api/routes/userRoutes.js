import { Router } from "express";
import { register, getAllUsers, getUser, updateUser, deleteUser } from "../controllers/usersControllers.js";
import { validateAuth, requireRoles } from "../../core/middlewares/authMiddleware.js";
import { validateRegister, validateUpdate, validateId } from "../../core/utilities/validations/userValidations.js";

const userRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - nickname
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated user ID
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         nickname:
 *           type: string
 *           description: User's unique nickname
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         password:
 *           type: string
 *           description: User's password (only required for registration)
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *             enum: [user, admin, hotel_manager]
 *           description: User's roles
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - nickname
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               nickname:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email or nickname already exists
 */
userRoutes.post('/register', validateRegister, register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickname
 *               - password
 *             properties:
 *               nickname:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
userRoutes.post('/login', login);

// Protected routes
userRoutes.use(validateAuth);

// Admin only routes
userRoutes.get('/', requireRoles('admin'), getAllUsers);

// User or Admin routes
userRoutes.get('/:id', validateId, requireRoles('user', 'admin'), getUser);
userRoutes.put('/:id', validateUpdate, requireRoles('user', 'admin'), updateUser);
userRoutes.delete('/:id', validateId, requireRoles('admin'), deleteUser);

export default userRoutes;
