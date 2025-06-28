import { body, check } from "express-validator";
import { validateResult } from "../../middlewares/resultValidator.js"; 


export const bookingValidations = [
    check("roomsToReserve.*").isInt().withMessage("Number of rooms to reserve must be an integer."),

    (req,res,next) => {
        validateResult(req,res,next)
    }


]