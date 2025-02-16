import { body, check } from "express-validator";
import { validateResult } from "../../middlewares/resultValidator.js"; 
import Hotel from "../../models/hotelModel.js"

async function getHotelRoomTypes (hotelId){
    const hotelExist = await Hotel.exists(hotelId);
    if (!hotelExist){
        return null
    }
    const hotel = await Hotel.findById(hotelId);
    const roomTypes = hotel.roomTypes.map(type => type.toLowerCase());

    return roomTypes;

}


// export const validateHotelRoomsAvailability = [
//     check("roomsToReserve.*").isInt().withMessage("Number of rooms to reserve must be an integer."),
//     check("roomsToReserve").custom(async (value, {req}) =>{
//         const hotelRoomTypes = await getHotelRoomTypes(req.params.hotelId);
//         const roomTypesEntry = Object.keys(value).map(type => type.toLowerCase())
//         console.log(hotelRoomTypes);
//         console.log(roomTypesEntry);
//         const isValidTypes = hotelRoomTypes.every(type => roomTypesEntry.include(type));

//         if(!isValidTypes){
//             const error = new Error("Available rooms for this hotel are:" + hotelRoomTypes)
//             throw error
//         }
//     }),
//     (req,res,next) => {
//         validateResult(req,res,next)
//     }


// ]