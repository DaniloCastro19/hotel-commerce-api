import { body, check } from "express-validator";
import { validateResult } from "../../middlewares/resultValidator.js"; 


export const validateBody = [
    check("name").notEmpty().withMessage("name cannot be empty"),
    check("name").isString().withMessage("name must be string"),

    check("location").notEmpty().withMessage("location cannot be empty"),
    check("location").isString().withMessage("location must be string"),

    check("rating").notEmpty().withMessage("rating cannot be empty"),
    check("rating").isNumeric().withMessage("rating must be Numeric"),

    check("rooms").notEmpty().withMessage("rooms cannot be empty"),
    check("rooms").isInt().withMessage("rooms must be an Numeric"),
    
    check("roomsAvailable").notEmpty().withMessage("roomsAvailable cannot be empty"),
    check("roomsAvailable").isInt().withMessage("roomsAvailable must be an integer"),
    
    check("roomTypes").notEmpty().withMessage("roomTypes cannot be empty"),
    check("roomTypes").isArray().withMessage("roomTypes must be an array"),

    check("amenities").notEmpty().withMessage("amenities cannot be empty"),
    check("amenities").isArray().withMessage("amenities must be an array"),

    check("averagePricePerNight").notEmpty().withMessage("averagePricePerNight cannot be empty"),
    check("averagePricePerNight").isFloat().withMessage("averagePricePerNight must be an array"),

    (req,res,next) => {
        
        validateResult(req,res,next)
    }


]