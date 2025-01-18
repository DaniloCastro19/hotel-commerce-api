import RoomService from "../../core/services/roomsService.js";
import {ENTITY_NOT_FOUND} from "../../core/utilities/customErrors.js"
const roomService = new RoomService();


export const getRoom = async (req, res, next) =>{   
    try{
        const room = await roomService.createRoom(req.body);
        return res.status(201).json(room);
    }catch(error){
        next(error);
    }
}

export const createRoom = async (req, res, next) =>{   
    try{
        const room = await roomService.createRoom(req.body);
        return res.status(201).json(room);
    }catch(error){
        next(error);
    }
}
 