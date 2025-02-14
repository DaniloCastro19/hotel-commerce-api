import { body, check } from "express-validator";
import { validateResult } from "../../middlewares/resultValidator.js"; 
import Constants from "../constants.js"


export const validateBody = [

    check("roomType").notEmpty().withMessage("roomType cannot be empty"),
    check("roomType").isString().withMessage("roomType must be string"),


    check("nBeds").notEmpty().withMessage("nBeds cannot be empty"),
    check("nBeds").isInt().withMessage("nBeds must be an integer"),

    check("pricePerNight").notEmpty().withMessage("pricePerNight cannot be empty"),
    check("pricePerNight").isFloat().withMessage("pricePerNight must be flaot"),

    (req,res,next) => {
        
        validateResult(req,res,next)
    }
]

export const validateRoomType = [
    body('roomType').isIn(Constants.ROOM_TYPES).withMessage("Room types must be one of these: [Simple, Double, Triple, SuiteCouple, SuiteFamiliar]"),

    (req,res,next) => {
        
        validateResult(req,res,next)
    }
]

