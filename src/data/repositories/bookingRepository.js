import Booking from "../../core/models/bookingModel.js"

    export const isIdExisting = async (id) =>{
        return await Booking.exists({_id:id});
    }

    export const getAll = async () => {
        return await Booking.find()
    } ;
    
    
    export const getById = async (id) => {
        const reservation = Booking.findById(id);
        return reservation
    } 

    export const create = async (data) =>  {
        const reservation = new Booking(data);
        return await reservation.save();
    };

    export const update = async (id, body) => {
        return await Booking.findByIdAndUpdate(id,body, {new:true});
    };

    export const findAndDelete = async (id) => {
        return await Booking.findOneAndDelete({_id:id});
    };
