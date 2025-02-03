import { BookingService } from '../../core/services/bookingService.js';

const bookingService = new BookingService();

export const createBooking = async (req, res) => {
    try {
        const bookingData = {
            ...req.body,
            userID: req.user.id // Obtener el ID del usuario del token
        };
        const booking = await bookingService.createReservation(bookingData);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * get all -- para toda la pagina
 * admin para historial
 */
export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllReservations();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * user -- persona sus datos tengo solo sus datos
 * admin
 */
export const getBookingById = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
        const bookings = await bookingService.getHotelReservations(hotelId);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

/**
 * user -- persona sus datos tengo solo sus datos
 * users y sus reservas
 */
export const getAllUserBooking = async (req, res) => {
    try {
        const userId = req.user.id; // Obtener el ID del usuario del token
        const bookings = await bookingService.getUserReservations(userId);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookingId = req.params.id;
        const booking = await bookingService.cancelReservation(bookingId, userId);
        if (!booking) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json({ message: 'Reserva cancelada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
