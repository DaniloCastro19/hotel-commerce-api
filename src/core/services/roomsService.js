import Room from "../../api/models/roomModel.js";
import fs from "fs";
import path from "path";

const filePath = patch.resolve(".src/data/json/rooms.json");


export default class RoomService{
    constructor(){
    }


    async getRoom (id){

    }

    async createRoom (body) {
        const {id, hotelId,roomNumber,userId, roomType,capacity, nBeds, available, pricePerNight} = body
        const newRoom = Room(
            id,
            hotelId,
            roomNumber,
            userId,
            roomType,
            capacity,
            nBeds,
            capacity,
            available,
            pricePerNight
        );
        return newRoom.toJSON();
    }
}