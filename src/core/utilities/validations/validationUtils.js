import { validationResult } from 'express-validator';
import { BAD_REQUEST } from '../customErrors.js';

export const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw BAD_REQUEST(errors.array().map(err => err.msg).join(', '));
    }
    next();
}; 