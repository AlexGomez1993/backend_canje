import express from "express";
import {
    listarCampania,
    activarCampania,
    crearCampania,
    agregarTiendas,
    agregarPromociones,
} from "../controller/campaniaController.js";

const campaniaRouter = express.Router();

campaniaRouter.get("/", listarCampania);
campaniaRouter.post("/activarCampania", activarCampania);
campaniaRouter.post("/", crearCampania);
campaniaRouter.post("/agregarTiendas", agregarTiendas);
campaniaRouter.post("/agregarPromociones", agregarPromociones);

export default campaniaRouter;
