import { ENTITY_NOT_FOUND } from '../../core/utilities/customErrors.js';
import { HotelServices } from '../../core/services/hotelsServices.js';

export class HotelsController {
  static async getAllHotels(req, res, next) {
    try {
      const hotels = await HotelServices.getAllHotels();
      res.json(hotels);
    } catch (error) {
      next(error);
    }
  }

  static async getHotelById(req, res, next) {
    try {
      const hotel = await HotelServices.getHotelById(req.params.id);
      if (!hotel) {
        return next(ENTITY_NOT_FOUND('Hotel'));
      }
      res.json(hotel);
    } catch (error) {
      next(error);
    }
  }

  static async createHotel(req, res, next) {
    try {
      const newHotel = await HotelServices.createHotel(req.body);
      res.status(201).json(newHotel);
    } catch (error) {
      next(error);
    }
  }

  static async updateHotel(req, res, next) {
    try {
      const updatedHotel = await HotelServices.updateHotel(req.params.id, req.body);
      if (!updatedHotel) {
        return next(ENTITY_NOT_FOUND('Hotel'));
      }
      res.json(updatedHotel);
    } catch (error) {
      next(error);
    }
  }

  static async deleteHotel(req, res, next) {
    try {
      const deleted = await HotelServices.deleteHotel(req.params.id);
      if (!deleted) {
        return next(ENTITY_NOT_FOUND('Hotel'));
      }
      res.json({ message: 'Hotel deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
