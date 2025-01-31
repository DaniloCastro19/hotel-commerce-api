import { getAll, create, getById, update, findAndDelete, isIdExisting} from "../../data/repositories/roomsRepository.js";
import { isHotelExisting } from "../../data/repositories/hotelsRepository.js";

export default class RoomService{
    constructor(){
    }

    async getAllRooms(hotelId){
        const allRooms = await getAll();
        const roomsByHotelId = allRooms.filter(room => room.hotelId===hotelId);

        return roomsByHotelId;
    }


    async getRoom(id){
        const room = await getById(id);
        if (!room){
            return null
        }
        return room
    }


    async createRoom (hotelId, body) {
        const hotelExist = await isHotelExisting(hotelId);
        if (!hotelExist){
            return null
        }
        body.hotelId=hotelId
        const newRoom = await create(body);
        return newRoom;
    }

    async updateRoom(id, body){
        const roomExist = await isIdExisting(id);
        if (!roomExist){
            return null
        }
        const updatedRoom = await update(id,body);
        return updatedRoom;
    }


    async deleteRoom(id){
        const roomExist = await isIdExisting(id);
        if (!roomExist){
            return null
        }
        const room = await findAndDelete(id);
        return room
    }

    async filterRooms(filters) {
        let rooms = await getAll();

        if (filters.capacity) {
            rooms = rooms.filter(room => 
                room.capacity >= parseInt(filters.capacity)
            );
        }

        if (filters.roomType) {
            const normalizeString = (str) => str.toLowerCase().replace(/[-\s]/g, '');
            const searchType = normalizeString(filters.roomType);
            
            rooms = rooms.filter(room => 
                normalizeString(room.roomType) === searchType
            );
        }

        if (filters.nBeds) {
            rooms = rooms.filter(room => 
                room.nBeds >= parseInt(filters.nBeds)
            );
        }

        if (filters.maxPrice) {
            rooms = rooms.filter(room => 
                room.pricePerNight <= parseInt(filters.maxPrice)
            );
        }

        if (filters.minPrice) {
            rooms = rooms.filter(room => 
                room.pricePerNight >= parseInt(filters.minPrice)
            );
        }

        return rooms;
    }

}