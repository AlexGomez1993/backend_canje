import express from "express";
import { listarCiudades } from "../controller/ciudadController.js";
import { listarUsuarios } from "../controller/usuarioController.js";

const usuarioRouter = express.Router();

usuarioRouter.get("/", listarUsuarios);

export default usuarioRouter;
