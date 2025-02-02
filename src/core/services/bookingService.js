import { getAll, create, getById, update, findAndDelete, isIdExisting} from "../../data/repositories/bookingRepository";

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

  async cancelReservation(id) {
    const reservationExist = await isIdExisting(id);
    if (!reservationExist){
      return null
    }
    const cancelledReservation = await findAndDelete(id);
    return cancelledReservation
  }
}
