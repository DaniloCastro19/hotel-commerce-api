import * as bookingRepository from '../../data/repositories/bookingRepository.js';
import { INVALID_INPUT, ENTITY_NOT_FOUND } from '../utilities/customErrors.js';

export class BookingService {
    async createBooking(bookingData) {
        const { roomId, checkInDate, checkOutDate } = bookingData;
        
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        
        if (startDate >= endDate) {
            throw INVALID_INPUT('Check-out date must be after check-in date');
        }
        
        if (startDate < new Date()) {
            throw INVALID_INPUT('Check-in date cannot be in the past');
        }

        const isAvailable = await bookingRepository.isRoomAvailable(
            roomId,
            startDate,
            endDate
        );

        if (!isAvailable) {
            throw INVALID_INPUT('Room is not available for the selected dates');
        }

        const pricePerNight = await bookingRepository.getRoomPrice(roomId);
        if (!pricePerNight) {
            throw ENTITY_NOT_FOUND('Room');
        }

        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * pricePerNight;

        return await bookingRepository.createBooking({
            ...bookingData,
            totalPrice,
            status: 'confirmed'
        });
    }

    async getAllBookings() {
        return await bookingRepository.getAllBookings();
    }

    async getBookingById(id) {
        const booking = await bookingRepository.getBookingById(id);
        if (!booking) {
            return null;
        }
        return booking;
    }

    async getUserBookings(userId) {
        return await bookingRepository.getUserBookings(userId);
    }

    async updateBooking(id, data) {
        const booking = await this.getBookingById(id);
        if (!booking) {
            return null;
        }
        return await bookingRepository.updateBooking(id, data);
    }

    async cancelBooking(id) {
        const booking = await this.getBookingById(id);
        if (!booking) {
            return null;
        }
        return await bookingRepository.updateBooking(id, { status: 'cancelled' });
    }
} 