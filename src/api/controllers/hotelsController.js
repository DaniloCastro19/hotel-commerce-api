import { ENTITY_NOT_FOUND } from '../../core/utilities/customErrors.js';
import { HotelServices } from '../../core/services/hotelsServices.js';

const hotelService = new HotelServices();
export class HotelsController {
  static async getAllHotels(req, res, next) {
    try {
      const hotels = await hotelService.getAllHotels();
      res.status(200).json(hotels);
    } catch (error) {
      next(error);
    }
  }

  static async getHotelById(req, res, next) {
    try {
      const hotel = await hotelService.getHotelById(req.params.id);
      if (!hotel) {
        throw ENTITY_NOT_FOUND('Hotel')
      }
      return res.status(200).json(hotel);
    } catch (error) {
      next(error);
    }
  }

  static async createHotel(req, res, next) {
    try {
      const newHotel = await hotelService.createHotel(req.body);
      res.status(201).json(newHotel);
    } catch (error) {
      next(error);
    }
  }

  static async updateHotel(req, res, next) {
    try {
      const updatedHotel = await hotelService.updateHotel(req.params.id, req.body);
      if (!updatedHotel) {
        throw ENTITY_NOT_FOUND('Hotel');
      }
      return res.status(200).json(updatedHotel);

    } catch (error) {
      next(error);
    }
  }

  static async deleteHotel(req, res, next) {
    try {
      const deleted = await hotelService.deleteHotel(req.params.id);
      if (!deleted) {
        throw ENTITY_NOT_FOUND('Hotel');
      }
      return res.json({ message: 'Hotel deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
