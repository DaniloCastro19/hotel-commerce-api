import { getAll, create, getById, update, findAndDelete, isIdExisting} from "../../data/repositories/bookingRepository.js";
import Room from "../models/roomModel.js";
import Hotel from "../models/hotelModel.js";

import Booking from "../models/bookingModel.js";

export class BookingService {

  constructor(){}

  async getAllReservations() {
    return await getAll();
  }

  async getHotelReservations(hotelId) {
    const bookings = await Booking.find({ hotelID: hotelId })
      .populate('userID', 'firstName lastName email')
      .populate('roomID', 'roomNumber roomType');
    return bookings;
  }

  async getUserReservations(userId) {
    const bookings = await Booking.find({ userID: userId })
      .populate('hotelID', 'name location')
      .populate('roomID', 'roomNumber roomType pricePerNight');
    return bookings;
  }

  async getReservationById(id) {
    const reservation = await getById(id);
    if(!reservation){
      return null
    }
    return reservation
  }

  async createReservation(reservationData) {
    const room = await Room.findById(reservationData.roomID);
    const hotel = await Hotel.findById(reservationData.hotelID)
    if (!room || !room.available) {
      throw new Error('La habitación no está disponible');
    }

    const startDate = new Date(reservationData.startReservationDate);
    const endDate = new Date(reservationData.endReservationDate);
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    reservationData.totalPrice = nights * room.pricePerNight;

    const reservation = await create(reservationData);

    await Room.findByIdAndUpdate(reservationData.roomID, { available: false });

    return reservation;
  }

  async updateReservation(id, hotelData) {
    const reservationExist = await isIdExisting(id);
    if (!reservationExist){
      return null
    }
    const updatedReservation = await update(id,hotelData);
    return updatedReservation
  }

  async cancelReservation(bookingId, userId) {
    const reservation = await Booking.findById(bookingId)
        .populate('userID', '_id');
    
    if (!reservation) {
        throw new Error('Reservation not found');
    }

    console.log('Reservation userID:', reservation.userID._id.toString());
    console.log('Request userId:', userId);

    const isOwner = reservation.userID._id.toString() === userId.toString();
    
    if (!isOwner) {
        throw new Error('Unauthorized to cancel this reservation');
    }

    const cancelledReservation = await Booking.findByIdAndUpdate(
        bookingId,
        { status: 'cancelled' },
        { new: true }
    );

    if (cancelledReservation) {
        await Room.findByIdAndUpdate(reservation.roomID, { available: true });
    }

    return cancelledReservation;
  }
}
