import { BookingService } from '../../core/services/bookingService.js';

const bookingService = new BookingService();

export const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const booking = await bookingService.createReservation(bookingData);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getUsersReservations();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getReservationById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const booking = await bookingService.cancelReservation(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json({ message: 'Reserva cancelada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
