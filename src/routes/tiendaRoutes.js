import express from "express";
import { listarTiendas } from "../controller/tiendaController.js";

const tiendasRouter = express.Router();

tiendasRouter.get("/", listarTiendas);

export default tiendasRouter;
