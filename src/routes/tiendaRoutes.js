import express from "express";
import { listarTiendas, activarTienda, crearTienda } from "../controller/tiendaController.js";

const tiendasRouter = express.Router();

tiendasRouter.get("/", listarTiendas);
tiendasRouter.post("/activarTienda", activarTienda);
tiendasRouter.post("/", crearTienda)

export default tiendasRouter;
