import express from "express";
import { listarSaldosCliente } from "../controller/saldosController.js";

const saldosClienteRouter = express.Router();

saldosClienteRouter.get("/", listarSaldosCliente);

export default saldosClienteRouter;
