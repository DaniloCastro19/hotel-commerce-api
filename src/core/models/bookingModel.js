import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const bookingModel = new mongoose.Schema(
    {
        startReservationDate:{
            type: Date,
            min: Date.now(),
            required: true
        },
        endReservationDate:{
            type: Date,
            required: true
        },
        userID:{
            type: ObjectId,
            ref: 'users',
            required: true
        },
        hotelID:{
            type: ObjectId,
            ref: 'hotels',
            required: true
        },
        roomsToReserve:{
            type: Object,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        reservationDetails:{
            type: Object,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending'
        }
    }, 
    {
        timestamps: true
    }
);

export default mongoose.model('reservations', bookingModel);

