import fs from "fs";
import path from "path";

import { getAll, create, getById, update, findAndDelete, isIdExisting} from "../../data/roomsRepositorie.js";

const filePath = path.resolve("./src/data/json/rooms.json");

export default class RoomService{
    constructor(){
    }

    async getAllRooms(){
        const rooms = await getAll();
        return rooms;
    }


    async getRoom(id){
        const room = await getById(id);
        if (!room){
            return null
        }
        return room
    }


    async createRoom (body) {
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
        const data = await this.readData();
        let filteredRooms = data.rooms;

        if (Object.keys(filters).length === 0) {
            return [];
        }

        if (filters.capacity) {
            filteredRooms = filteredRooms.filter(room => 
                room.capacity >= parseInt(filters.capacity)
            );
        }

        if (filters.roomType) {
            const normalizeString = (str) => str.toLowerCase().replace(/[-\s]/g, '');
            const searchType = normalizeString(filters.roomType);
            
            filteredRooms = filteredRooms.filter(room => 
                normalizeString(room.roomType) === searchType
            );
        }

        if (filters.nBeds) {
            filteredRooms = filteredRooms.filter(room => 
                room.nBeds >= parseInt(filters.nBeds)
            );
        }

        if (filters.maxPrice) {
            filteredRooms = filteredRooms.filter(room => 
                room.pricePerNight <= parseInt(filters.maxPrice)
            );
        }

        if (filters.minPrice) {
            filteredRooms = filteredRooms.filter(room => 
                room.pricePerNight >= parseInt(filters.minPrice)
            );
        }

        return filteredRooms;
    }

}