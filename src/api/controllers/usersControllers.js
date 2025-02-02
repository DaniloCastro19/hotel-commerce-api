import { validationResult } from 'express-validator';
import UsersRepository from '../../data/repositories/usersRepository.js';
import { CreateUserDto, LoginUserDto, UserResponseDto } from '../../core/dtos/userDto.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const DEFAULT_ROLE = 'unlogged';
const VALID_ROLES = ['user', 'unlogged', 'admin'];

class UsersController {
    async createUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const userData = req.body;
            const existingUser = await UsersRepository.getUserByEmail(userData.email);
            
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const user = await UsersRepository.createUser(userData);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UsersRepository.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await UsersRepository.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Validar roles si se están actualizando
            if (req.body.roles) {
                const invalidRoles = req.body.roles.filter(role => !VALID_ROLES.includes(role));
                if (invalidRoles.length > 0) {
                    return res.status(400).json({ 
                        message: `Invalid roles: ${invalidRoles.join(', ')}. Valid roles are: ${VALID_ROLES.join(', ')}`
                    });
                }
            }

            const user = await UsersRepository.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const userResponse = new UserResponseDto(user);
            res.json(userResponse);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await UsersRepository.deleteUser(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const userData = new CreateUserDto(req.body);
            
            // Verificar si el email ya existe
            const existingEmail = await UsersRepository.getUserByEmail(userData.email);
            if (existingEmail) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Hash de la contraseña
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);

            // Asignar rol por defecto si no se especifica
            if (!userData.roles || userData.roles.length === 0) {
                userData.roles = [DEFAULT_ROLE];
            } else {
                // Validar que los roles sean válidos
                const invalidRoles = userData.roles.filter(role => !VALID_ROLES.includes(role));
                if (invalidRoles.length > 0) {
                    return res.status(400).json({ 
                        message: `Invalid roles: ${invalidRoles.join(', ')}. Valid roles are: ${VALID_ROLES.join(', ')}`
                    });
                }
            }

            const user = await UsersRepository.createUser(userData);
            const userResponse = new UserResponseDto(user);
            
            res.status(201).json(userResponse);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const loginData = new LoginUserDto(req.body);
            const user = await UsersRepository.getUserByEmail(loginData.email);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const validPassword = await bcrypt.compare(loginData.password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generar JWT
            const token = jwt.sign(
                { 
                    id: user._id,
                    email: user.email,
                    roles: user.roles 
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            const userResponse = new UserResponseDto(user);
            res.json({ token, user: userResponse });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new UsersController();
