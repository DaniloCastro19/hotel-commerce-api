import mongoose from "mongoose";


const roomModel = new mongoose.Schema(
    {
        hotelId:{
            type: String,
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

        pricePerNight: {
            type: Number,
            require: true
        },

    }, {timestamps:false}
);

export default mongoose.model('rooms', roomModel);

