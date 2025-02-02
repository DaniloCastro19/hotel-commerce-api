import mongoose from "mongoose";

const bookingModel = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        roomId: {
            type: String,
            required: true
        },
        checkInDate: {
            type: Date,
            required: true
        },
        checkOutDate: {
            type: Date,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending'
        }
    }, 
    { timestamps: true }
);

export default mongoose.model('bookings', bookingModel); 