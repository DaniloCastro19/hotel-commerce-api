import UsersRepository from '../../data/repositories/usersRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserDto, LoginUserDto, UserResponseDto } from '../dtos/userDto.js';

const DEFAULT_ROLE = 'unlogged';
const VALID_ROLES = ['user', 'unlogged', 'admin'];

class UserService {
    async createUser(userData) {
        const existingUser = await UsersRepository.getUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        const user = await UsersRepository.createUser(userData);
        return new UserResponseDto(user);
    }

    async register(userData) {
        const createUserDto = new CreateUserDto(userData);

        const existingUser = await UsersRepository.getUserByEmail(createUserDto.email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        const salt = await bcrypt.genSalt(10);
        createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

        if (!createUserDto.roles || createUserDto.roles.length === 0) {
            createUserDto.roles = [DEFAULT_ROLE];
        } else {
            const invalidRoles = createUserDto.roles.filter(role => !VALID_ROLES.includes(role));
            if (invalidRoles.length > 0) {
                throw new Error(`Invalid roles: ${invalidRoles.join(', ')}. Valid roles are: ${VALID_ROLES.join(', ')}`);
            }
        }

        const user = await UsersRepository.createUser(createUserDto);
        return new UserResponseDto(user);
    }

    async login(loginData) {
        const loginDto = new LoginUserDto(loginData);
        const user = await UsersRepository.getUserByEmail(loginDto.email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const validPassword = await bcrypt.compare(loginDto.password, user.password);
        if (!validPassword) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email,
                roles: user.roles 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            token,
            user: new UserResponseDto(user)
        };
    }

    async getAllUsers(requestUser) {
        if (!requestUser.roles.includes('admin')) {
            const user = await UsersRepository.getUserById(requestUser.id);
            return [new UserResponseDto(user)];
        }
        
        const users = await UsersRepository.getAllUsers();
        return users.map(user => new UserResponseDto(user));
    }

    async getUserById(id) {
        const user = await UsersRepository.getUserById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return new UserResponseDto(user);
    }

    async updateUser(id, userData) {
        if (userData.roles) {
            const invalidRoles = userData.roles.filter(role => !VALID_ROLES.includes(role));
            if (invalidRoles.length > 0) {
                throw new Error(`Invalid roles: ${invalidRoles.join(', ')}. Valid roles are: ${VALID_ROLES.join(', ')}`);
            }
        }

        const user = await UsersRepository.updateUser(id, userData);
        if (!user) {
            throw new Error('User not found');
        }
        return new UserResponseDto(user);
    }

    async deleteUser(id) {
        const user = await UsersRepository.deleteUser(id);
        if (!user) {
            throw new Error('User not found');
        }
        return true;
    }
}

export default new UserService();
