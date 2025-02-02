import { getAll, create, getById, update, findAndDelete, isHotelExisting} from "../../data/repositories/hotelsRepository.js";

export class HotelServices {

  constructor(){}

  async getAllHotels() {
    const data = await getAll();
    return data;
  }

  async getHotelById(id) {
    const hotel = await getById(id);
    if(!hotel){
      return null
    }
    return hotel
  }

  async createHotel(hotelData) {
    const hotel = await create(hotelData);
    return hotel;
  }

  async updateHotel(id, hotelData) {
    const hotelExist = await isHotelExisting(id);
    if (!hotelExist){
      return null
    }
    const updatedHotel = await update(id,hotelData);
    return updatedHotel
  }

  async deleteHotel(id) {
    const hotelExist = await isHotelExisting(id);
    if (!hotelExist){
      return null
    }
    const deletedHotel = await findAndDelete(id);
    return deletedHotel
  }
}
