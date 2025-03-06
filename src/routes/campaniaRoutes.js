import express from "express";
import { listarCampania,activarCampania, crearCampania } from "../controller/campaniaController.js";

const campaniaRouter = express.Router();

campaniaRouter.get("/", listarCampania);
campaniaRouter.post("/activarCampania", activarCampania);
campaniaRouter.post("/", crearCampania)

export default campaniaRouter;
