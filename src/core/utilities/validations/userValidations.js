import { body, param } from 'express-validator';
import { validateResult } from './validationUtils.js';

const VALID_ROLES = ['user', 'unlogged', 'admin'];

export const validateRegister = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .trim(),
    
    body('nickname')
        .notEmpty().withMessage('Nickname is required')
        .isLength({ min: 3, max: 30 }).withMessage('Nickname must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Nickname can only contain letters, numbers, underscores and dashes')
        .trim(),
    
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    
    body('firstName')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/).withMessage('First name can only contain letters, spaces, hyphens and apostrophes')
        .trim(),
    
    body('lastName')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
        .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/).withMessage('Last name can only contain letters, spaces, hyphens and apostrophes')
        .trim(),
    
    body('roles')
        .optional()
        .isArray().withMessage('Roles must be an array')
        .custom((value) => {
            return value.every(role => VALID_ROLES.includes(role));
        }).withMessage('Invalid role(s). Valid roles are: user, unlogged, admin'),
    
    validateResult
];

export const validateUpdate = [
    param('id')
        .isMongoId().withMessage('Invalid user ID format'),
    
    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .trim(),
    
    body('nickname')
        .optional()
        .isLength({ min: 3, max: 30 }).withMessage('Nickname must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Nickname can only contain letters, numbers, underscores and dashes')
        .trim(),
    
    body('firstName')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/).withMessage('First name can only contain letters, spaces, hyphens and apostrophes')
        .trim(),
    
    body('lastName')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
        .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/).withMessage('Last name can only contain letters, spaces, hyphens and apostrophes')
        .trim(),
    
    body('roles')
        .optional()
        .isArray().withMessage('Roles must be an array')
        .custom((value) => {
            return value.every(role => VALID_ROLES.includes(role));
        }).withMessage('Invalid role(s). Valid roles are: user, unlogged, admin'),
    
    validateResult
];

export const validateId = [
    param('id')
        .isMongoId().withMessage('Invalid user ID format'),
    validateResult
];

export const validateLogin = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .trim(),
    
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    
    validateResult
]; 