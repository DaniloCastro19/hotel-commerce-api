import Room from "../../api/models/roomModel.js";
import fs from "fs";
import path from "path";

const filePath = path.resolve("./src/data/json/rooms.json");

export default class RoomService{
    constructor(){
    }

    async readData (){
        const data = await fs.promises.readFile(filePath, "utf8");
        return JSON.parse(data);
    }


    async writeData(data){
        await fs.promises.writeFile(filePath, JSON.stringify(data,null,2))
    }


    async getAllRooms(){
        const data = await this.readData();
        return data.rooms;
    }


    async getRoom(id){
        const data = await this.readData();
        return data.rooms.find(room => room.id ===id);
    }


    async createRoom (body) {

        const data = await this.readData();
        const newRoom = {
            id:String(data.rooms.length + 1),
            ...body
        };

        data.rooms.push(newRoom);

        await this.writeData(data);

        return newRoom;

    }

    async updateRoom(id, body){
        const data = await this.readData();
        const roomIndex = data.rooms.findIndex(room => room.id ===id);
        if(roomIndex === -1){
            return null;
        }
        data.rooms[roomIndex] = {...data.rooms[roomIndex], ...body};
        await this.writeData(data);
        return data.rooms[roomIndex];
    }


    async deleteRoom(id){
        const data = await this.readData();
        const roomIndex = data.rooms.findIndex(room => room.id ===id);
        if(roomIndex === -1){
            return null;
        }

        const deleteRoom = data.rooms.splice(roomIndex,1);
        await this.writeData(data);
        return deleteRoom[0]
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