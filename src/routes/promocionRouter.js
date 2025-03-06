import express from "express";
import { listarPromocion,activarPromocion, crearPromocion } from "../controller/promocionController.js";

const promocionRouter = express.Router();

promocionRouter.get("/", listarPromocion);
promocionRouter.post("/activarPromocion", activarPromocion);
promocionRouter.post("/", crearPromocion)

export default promocionRouter;
