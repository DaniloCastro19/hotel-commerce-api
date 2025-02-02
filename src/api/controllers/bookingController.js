import { BookingService } from '../../core/services/bookingService.js';
import { ENTITY_NOT_FOUND } from '../../core/utilities/customErrors.js';

const bookingService = new BookingService();

export class BookingController {
    static async createBooking(req, res, next) {
        try {
            const bookingData = {
                ...req.body,
                userId: req.user.id // From auth middleware
            };
            const booking = await bookingService.createBooking(bookingData);
            res.status(201).json(booking);
        } catch (error) {
            next(error);
        }
    }

    static async getAllBookings(req, res, next) {
        try {
            const bookings = await bookingService.getAllBookings();
            res.status(200).json(bookings);
        } catch (error) {
            next(error);
        }
    }

    static async getBookingById(req, res, next) {
        try {
            const booking = await bookingService.getBookingById(req.params.id);
            if (!booking) {
                throw ENTITY_NOT_FOUND('Booking');
            }
            res.status(200).json(booking);
        } catch (error) {
            next(error);
        }
    }

    static async getUserBookings(req, res, next) {
        try {
            const bookings = await bookingService.getUserBookings(req.user.id);
            res.status(200).json(bookings);
        } catch (error) {
            next(error);
        }
    }

    static async cancelBooking(req, res, next) {
        try {
            const booking = await bookingService.cancelBooking(req.params.id);
            if (!booking) {
                throw ENTITY_NOT_FOUND('Booking');
            }
            res.status(200).json(booking);
        } catch (error) {
            next(error);
        }
    }
} 