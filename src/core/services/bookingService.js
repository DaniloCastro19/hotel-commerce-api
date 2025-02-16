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

    
    const nTotalBedsToReserve = Object.values(reservationData.roomsToReserve).reduce((prev,curr) => prev+curr);
    const hotel = await Hotel.findById(reservationData.hotelID);
    
    if(!hotel){
      throw new Error("Hotel doesn't exist");
    }
    //Validate if Hotel have enought rooms
    if(nTotalBedsToReserve > hotel.roomsAvailable){
      throw new Error("Rooms available in hotel are currently not enought. Number of current Rooms availables: " + hotel.roomsAvailable);
    }

    // Obtain type of requested rooms
    const requestedTypes = Object.keys(reservationData.roomsToReserve); 
    

    //Find these rooms on bd 
    const rooms = await Room.find({
      hotelId: reservationData.hotelID,
      roomType: {$in: requestedTypes}
    });

    

    // validate all type exists
    const foundTypes = rooms.map(room => room.roomType);
    const missingTypes = requestedTypes.filter(type => !foundTypes.includes(type))
    if(missingTypes.length > 0){
      throw new Error(`Types no availables: ${missingTypes.join(", ")}`);
    }

    // Create a map of price per type
    const priceMap = {};
    rooms.forEach(room => {
      priceMap[room.roomType] = room.pricePerNight;
    });

    

    // Validate positive quantities
    for (const [type, quantity] of Object.entries(reservationData.roomsToReserve)) {
      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error(`Cantidad inválida para ${type}: ${quantity}`);
      }
    }
    //Calculating Nights

    const startDate = new Date(reservationData.startReservationDate);
    const endDate = new Date(reservationData.endReservationDate);
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));  

    //Calculate total
    let total = 0;
    for(const [type,quantity] of Object.entries(reservationData.roomsToReserve)){
      total+=priceMap[type]*quantity*nights;
    }

    reservationData.totalPrice = total;

    //Discount the available rooms from Hotel
    hotel.roomsAvailable = hotel.roomsAvailable - nTotalBedsToReserve;
    await hotel.save()

    const reservation = await create(reservationData);


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
