import {Router} from "express";
import { createRoom, getRoom } from "../controllers/roomController.js";
const roomRoutes = Router();


roomRoutes.get('/rooms/:id', getRoom);
roomRoutes.post('/rooms', createRoom);
// roomRoutes('/')
// roomRoutes('/')
// roomRoutes('/')


export default roomRoutes;