import mongoose from "mongoose";


const roomModel = new mongoose.Schema(
    {
        hotelId:{
            type: String,
            require: true
        },
        userId:{
            type: String,
            require: true
        },
        roomNumber:{
            type: Number,
            require: true
        },
        roomType:{
            type: String,
            require: true
        },
        nBeds: {
            type: Number,
            require: true
        },
        capacity: {
            type: Number,
            require: true
        },
        available: {
            type: Boolean,
            require: true
        },
        pricePerNight: {
            type: Number,
            require: true
        },

    }, {timestamps:false}
);

export default mongoose.model('rooms', roomModel);

