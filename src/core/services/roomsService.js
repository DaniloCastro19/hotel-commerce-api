import Room from "../../api/models/roomModel.js";


export default class RoomService{
    constructor(){

    }

    createMap = async(body) =>{
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
        return newRoom.toJSON(); // ?
    }
}