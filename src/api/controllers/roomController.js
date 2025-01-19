import RoomService from "../../core/services/roomsService.js";
import {ENTITY_NOT_FOUND} from "../../core/utilities/customErrors.js"
const roomService = new RoomService();


export const getAllRooms = async (req, res, next) =>{   
    try{
        const rooms = await roomService.getAllRooms();
        return res.status(200).json(rooms);
    }catch(error){
        next(error);
    }
}


export const getRoom = async (req, res, next) =>{   
    try{
        const room = await roomService.getRoom(req.params.id);
        if (room == null || room == undefined){throw ENTITY_NOT_FOUND('room')}
        return res.status(200).json(room);
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

export const updateRoom = async (req, res, next) =>{   
    try{
        const room = await roomService.updateRoom(req.params['id'], req.body);
        if (room == null){throw ENTITY_NOT_FOUND('room')}
        return res.status(200).json(room);
    }catch(error){
        next(error);
    }
}
 
export const deleteRoom = async (req, res, next) =>{   
    try{
        const room = await roomService.deleteRoom(req.params['id']);
        if (room == null){throw ENTITY_NOT_FOUND('room')}
        return res.status(200).json(room);
    }catch(error){
        next(error);
    }
}

export const filterRooms = async (req, res, next) => {
    try {
        const filters = req.query;
        
        if (Object.keys(filters).length === 0) {
            return res.status(400).json({ 
                message: "At least one filter is required" 
            });
        }

        const rooms = await roomService.filterRooms(filters);
        return res.status(200).json(rooms);
    } catch(error) {
        next(error);
    }
}
 