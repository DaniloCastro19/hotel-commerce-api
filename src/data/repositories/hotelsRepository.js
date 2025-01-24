import Hotel from "../../core/models/hotelModel.js"

    export const isIdExisting = async (id) =>{
        return await Hotel.exists({_id:id});
    }

    export const getAll = async () => {
        return await Hotel.find()
    } ;
    
    
    export const getById = async (id) => {
        const hotel = Hotel.findById(id);
        return hotel
    } 

    export const create = async (data) =>  {
        const hotel = new Hotel(data);
        return await hotel.save();
    };

    export const update = async (id, body) => {
        return await Hotel.findByIdAndUpdate(id,body, {new:true});
    };

    export const findAndDelete = async (id) => {
        return await Hotel.findOneAndDelete({_id:id});
    };
