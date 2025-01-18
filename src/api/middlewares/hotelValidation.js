import { BAD_REQUEST } from '../../core/utilities/customErrors.js';

const VALID_ROOM_TYPES = ['single', 'double', 'triple', 'suite', 'suite-family'];

export const validateCreateHotel = (req, res, next) => {
  const { name, location, rating, rooms, roomsAvailable, roomTypes, amenities } = req.body;

  if (!name || typeof name !== 'string') {
    return next(BAD_REQUEST('Hotel name is required and must be a string'));
  }

  if (!location || typeof location !== 'string') {
    return next(BAD_REQUEST('Hotel location is required and must be a string'));
  }

  if (rating !== undefined && (typeof rating !== 'number' || rating < 0 || rating > 5)) {
    return next(BAD_REQUEST('Rating must be a number between 0 and 5'));
  }

  if (!rooms || typeof rooms !== 'number' || rooms <= 0) {
    return next(BAD_REQUEST('Number of rooms must be a positive number'));
  }

  if (!roomsAvailable || typeof roomsAvailable !== 'number' || roomsAvailable < 0) {
    return next(BAD_REQUEST('Available rooms must be a non-negative number'));
  }

  if (roomsAvailable > rooms) {
    return next(BAD_REQUEST('Available rooms cannot exceed total rooms'));
  }

  if (!roomTypes || !Array.isArray(roomTypes) || roomTypes.length === 0) {
    return next(BAD_REQUEST('Room types must be a non-empty array'));
  }

  if (!roomTypes.every(type => VALID_ROOM_TYPES.includes(type))) {
    return next(BAD_REQUEST(`Room types must be one of: ${VALID_ROOM_TYPES.join(', ')}`));
  }

  if (amenities !== undefined && !Array.isArray(amenities)) {
    return next(BAD_REQUEST('Amenities must be an array'));
  }

  next();
};

export const validateUpdateHotel = (req, res, next) => {
  const { name, location, rating, rooms, roomsAvailable, roomTypes, amenities } = req.body;

  if (Object.keys(req.body).length === 0) {
    return next(BAD_REQUEST('No update data provided'));
  }

  if (name !== undefined && typeof name !== 'string') {
    return next(BAD_REQUEST('Hotel name must be a string'));
  }

  if (location !== undefined && typeof location !== 'string') {
    return next(BAD_REQUEST('Hotel location must be a string'));
  }

  if (rating !== undefined && (typeof rating !== 'number' || rating < 0 || rating > 5)) {
    return next(BAD_REQUEST('Rating must be a number between 0 and 5'));
  }

  if (rooms !== undefined && (typeof rooms !== 'number' || rooms <= 0)) {
    return next(BAD_REQUEST('Number of rooms must be a positive number'));
  }

  if (roomsAvailable !== undefined) {
    if (typeof roomsAvailable !== 'number' || roomsAvailable < 0) {
      return next(BAD_REQUEST('Available rooms must be a non-negative number'));
    }
    if (rooms && roomsAvailable > rooms) {
      return next(BAD_REQUEST('Available rooms cannot exceed total rooms'));
    }
  }

  if (roomTypes !== undefined) {
    if (!Array.isArray(roomTypes) || roomTypes.length === 0) {
      return next(BAD_REQUEST('Room types must be a non-empty array'));
    }
    if (!roomTypes.every(type => VALID_ROOM_TYPES.includes(type))) {
      return next(BAD_REQUEST(`Room types must be one of: ${VALID_ROOM_TYPES.join(', ')}`));
    }
  }

  if (amenities !== undefined && !Array.isArray(amenities)) {
    return next(BAD_REQUEST('Amenities must be an array'));
  }

  next();
}; 