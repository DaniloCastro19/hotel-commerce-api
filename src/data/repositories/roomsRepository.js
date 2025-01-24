import Room from "../../core/models/roomModel.js";


    export const isIdExisting = async (id) =>{
        return await Room.exists({_id:id});
    }

    export const getAll = async () => {
        return await Room.find()
    } ;
    
    
    export const getById = async (id) => {
        const room = Room.findById(id);
        return room
    } 

    export const create = async (data) =>  {
        const room = new Room(data);
        return await room.save();
    };

    export const update = async (id, body) => {
        return await Room.findByIdAndUpdate(id,body, {new:true});
    };

    export const findAndDelete = async (id) => {
        return await Room.findOneAndDelete({_id:id});
    };
