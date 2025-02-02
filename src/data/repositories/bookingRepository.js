import Booking from "../../core/models/bookingModel.js";
import Room from "../../core/models/roomModel.js";

export const createBooking = async (bookingData) => {
    const booking = new Booking(bookingData);
    return await booking.save();
};

export const getAllBookings = async () => {
    return await Booking.find();
};

export const getBookingById = async (id) => {
    return await Booking.findById(id);
};

export const getUserBookings = async (userId) => {
    return await Booking.find({ userId: userId });
};

export const updateBooking = async (id, data) => {
    return await Booking.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBooking = async (id) => {
    return await Booking.findByIdAndDelete(id);
};

export const isRoomAvailable = async (roomId, checkInDate, checkOutDate) => {
    const conflictingBookings = await Booking.find({
        roomId: roomId,
        status: 'confirmed',
        $or: [
            {
                checkInDate: { $lte: checkOutDate },
                checkOutDate: { $gte: checkInDate }
            }
        ]
    });
    
    return conflictingBookings.length === 0;
};

export const getRoomPrice = async (roomId) => {
    const room = await Room.findById(roomId);
    return room ? room.pricePerNight : null;
}; 