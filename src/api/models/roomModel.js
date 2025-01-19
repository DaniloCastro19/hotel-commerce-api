export default class Room {
    constructor(id, hotelId, roomNumber, userId, roomType, nBeds, capacity, available, pricePerNight){
        this.id = id;
        this.hotelId = hotelId;
        this.roomNumber = roomNumber;
        this.userId = userId;
        this.roomType = roomType;
        this.capacity = capacity;
        this.nBeds = nBeds;
        this.available = available;
        this.pricePerNight = pricePerNight;
    }
};