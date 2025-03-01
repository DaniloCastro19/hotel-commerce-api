import { BookingService } from '../../core/services/bookingService.js';

const bookingService = new BookingService();

export const createBooking = async (req, res) => {
    try {
        const bookingData = {
            ...req.body,
            userID: req.user.id,
            hotelID:req.params.hotelId
        };        
        const booking = await bookingService.createReservation(bookingData);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllReservations();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
        const bookings = await bookingService.getHotelReservations(hotelId);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

export const getAllUserBooking = async (req, res) => {
    try {
        const userId = req.user.id; 
        const bookings = await bookingService.getUserReservations(userId);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const userId = req.user.id;
c
        
        console.log('Token user ID:', userId);
        console.log('Booking ID:', bookingId);
        
        const booking = await bookingService.cancelReservation(bookingId, userId);
        res.status(200).json({ 
            message: 'Reserva cancelada exitosamente',
            booking 
        });
    } catch (error) {
        console.error('Error al cancelar reserva:', error);
        const statusCode = 
            error.message === 'Reservation not found' ? 404 :
            error.message === 'Unauthorized to cancel this reservation' ? 403 : 500;
            
        res.status(statusCode).json({ message: error.message });
    }
};
