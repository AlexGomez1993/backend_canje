import express from "express";
import { listarTiendas, activarTienda } from "../controller/tiendaController.js";

const tiendasRouter = express.Router();

tiendasRouter.get("/", listarTiendas);
tiendasRouter.post("/activarTienda", activarTienda);

export default tiendasRouter;
