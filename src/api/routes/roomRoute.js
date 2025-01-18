import {Router} from "express";
import { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom } from "../controllers/roomController.js";
const roomRoutes = Router();

roomRoutes.get('/', getAllRooms);
roomRoutes.get('/:id', getRoom);
roomRoutes.post('/', createRoom);
roomRoutes.put('/:id', updateRoom);
roomRoutes.delete('/:id', deleteRoom);

export default roomRoutes;