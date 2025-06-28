import { validationResult } from 'express-validator';
import UserService from '../../core/services/userServices.js';

class UsersController {
    async createUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(error.message === 'Email already exists' ? 400 : 500)
                .json({ message: error.message });
        }
    }

    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const result = await UserService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(error.message.includes('Invalid') ? 400 : 500)
                .json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const result = await UserService.login(req.body);
            res.json(result);
        } catch (error) {
            res.status(error.message === 'Invalid credentials' ? 401 : 500)
                .json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers(req.user);
            res.json(users);
        } catch (error) {
            res.status(error.message === 'Unauthorized' ? 403 : 500)
                .json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(error.message === 'User not found' ? 404 : 500)
                .json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const user = await UserService.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (error) {
            res.status(error.message.includes('not found') ? 404 : 
                      error.message.includes('Invalid roles') ? 400 : 500)
                .json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.params.id);
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(error.message === 'User not found' ? 404 : 500)
                .json({ message: error.message });
        }
    }
}

export default new UsersController();
