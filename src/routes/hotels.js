import express from 'express';
import { HotelsController } from '../api/controllers/hotelsController.js';
import { validateCreateHotel, validateUpdateHotel } from '../api/middlewares/hotelValidation.js';

const router = express.Router();

router.get('/', HotelsController.getAllHotels);

router.get('/:id', HotelsController.getHotelById);

router.post('/', validateCreateHotel, HotelsController.createHotel);

router.put('/:id', validateUpdateHotel, HotelsController.updateHotel);

router.delete('/:id', HotelsController.deleteHotel);

export default router;
