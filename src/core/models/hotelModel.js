import mongoose from "mongoose";


const hotelModel = new mongoose.Schema(
    {
        name:{
            type: String,
            require: true
        },
        location:{
            type: String,
            require: true
        },
        rating:{
            type: Number,
            require: true
        },
        totalRooms:{
            type: Number,
            require: true
        },
        roomsAvailable: {
            type: Number,
            require: true
        },
        roomTypes: {
            type: Array,
            require: true
        },
        promotions: {
            type: Array,
            require: true
        },
        averagePricePerNight: {
            type: Number,
            require: true
        },

    }, {timestamps:false}
);

export default mongoose.model('hotels', hotelModel);

