import jwt from 'jsonwebtoken';
import UsersRepository from '../../data/repositories/usersRepository.js';

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UsersRepository.getUserById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Add full user info to request
        req.user = {
            id: user._id,
            email: user.email,
            roles: user.roles
        };
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.roles.includes('admin')) {
        return res.status(403).json({ message: 'Requires admin role' });
    }
    next();
};

export const isUser = (req, res, next) => {
    if (!req.user || (!req.user.roles.includes('user') && !req.user.roles.includes('admin'))) {
        return res.status(403).json({ message: 'Requires user role' });
    }
    next();
};
