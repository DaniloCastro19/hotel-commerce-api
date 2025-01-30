import { body, check } from "express-validator";
import { validateResult } from "../../middlewares/resultValidator.js"; 


export const validateBody = [
    check("hotelId").notEmpty().withMessage("hotelId cannot be empty"),
    check("hotelId").isString().withMessage("hotelId must be string"),

    check("roomNumber").notEmpty().withMessage("roomNumber cannot be empty"),
    check("roomNumber").isInt().withMessage("roomNumber must be integer"),

    check("userId").notEmpty().withMessage("userId cannot be empty"),
    check("userId").isString().withMessage("userId must be string"),

    check("nBeds").notEmpty().withMessage("nBeds cannot be empty"),
    check("nBeds").isInt().withMessage("nBeds must be an integer"),

    
    check("capacity").notEmpty().withMessage("capacity cannot be empty"),
    check("capacity").isInt().withMessage("capacity must be an integer"),
    
    check("pricePerNight").notEmpty().withMessage("pricePerNight cannot be empty"),
    check("pricePerNight").isFloat().withMessage("pricePerNight must be flaot"),

    (req,res,next) => {
        
        validateResult(req,res,next)
    }


]