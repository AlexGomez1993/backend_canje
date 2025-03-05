import express from "express";
import { listarPromocion,activarPromocion } from "../controller/promocionController.js";

const promocionRouter = express.Router();

promocionRouter.get("/", listarPromocion);
promocionRouter.post("/activarPromocion", activarPromocion);

export default promocionRouter;
