import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../../data/json/hotels.json');

export class HotelServices {
  static async getAllHotels() {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data).hotels;
  }

  static async getHotelById(id) {
    const hotels = await this.getAllHotels();
    return hotels.find(hotel => hotel.id === id);
  }

  static async createHotel(hotelData) {
    const hotels = await this.getAllHotels();
    const newHotel = {
      id: Date.now().toString(),
      ...hotelData
    };
    
    hotels.push(newHotel);
    await fs.writeFile(dataPath, JSON.stringify({ hotels }, null, 2));
    return newHotel;
  }

  static async updateHotel(id, hotelData) {
    const hotels = await this.getAllHotels();
    const index = hotels.findIndex(hotel => hotel.id === id);
    
    if (index === -1) return null;
    
    hotels[index] = { ...hotels[index], ...hotelData };
    await fs.writeFile(dataPath, JSON.stringify({ hotels }, null, 2));
    return hotels[index];
  }

  static async deleteHotel(id) {
    const hotels = await this.getAllHotels();
    const filteredHotels = hotels.filter(hotel => hotel.id !== id);
    
    if (filteredHotels.length === hotels.length) return false;
    
    await fs.writeFile(dataPath, JSON.stringify({ hotels: filteredHotels }, null, 2));
    return true;
  }
}
