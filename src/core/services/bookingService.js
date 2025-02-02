import { getAll, create, getById, update, findAndDelete, isIdExisting} from "../../data/repositories/bookingRepository.js";
import Room from "../models/roomModel.js";

export class BookingService {

  constructor(){}

  async getUsersReservations() {
    const data = await getAll();
    return data;
  }

  async getReservationById(id) {
    const reservation = await getById(id);
    if(!reservation){
      return null
    }
    return reservation
  }

  async createReservation(reservationData) {
    // Verificar disponibilidad de la habitación
    const room = await Room.findById(reservationData.roomID);
    if (!room || !room.available) {
      throw new Error('La habitación no está disponible');
    }

    // Calcular el precio total
    const startDate = new Date(reservationData.startReservationDate);
    const endDate = new Date(reservationData.endReservationDate);
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    reservationData.totalPrice = nights * room.pricePerNight;

    // Crear la reserva
    const reservation = await create(reservationData);

    // Actualizar disponibilidad de la habitación
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

  async cancelReservation(id) {
    const reservation = await getById(id);
    if (!reservation) {
      return null;
    }

    // Actualizar el estado de la reserva
    const cancelledReservation = await update(id, { status: 'cancelled' });

    // Liberar la habitación
    await Room.findByIdAndUpdate(reservation.roomID, { available: true });

    return cancelledReservation;
  }
}
