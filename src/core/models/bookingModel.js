import mongoose from "mongoose";


const bookingModel = new mongoose.Schema(
    {
        reservationDate:{
            type: Date,
            min: Date.now(),
            require: true
        },
        userID:{
            type: ObjectId,
            require: true
        },
        hotelID:{
            type: ObjectId,
            require: true
        },
        roomType:{
            type: String,
            require: true
        },
        nNights: {
            type: Number,
            require: true
        },
        isCancelled: {
            type: Boolean,
            require: true
        },

    }, {timestamps:false}
);

export default mongoose.model('reservations', bookingModel);

