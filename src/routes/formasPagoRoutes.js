import express from "express";
import { listarFormaPago } from "../controller/formaPagoController.js";

const formaPagoRouter = express.Router();

formaPagoRouter.get("/", listarFormaPago);

export default formaPagoRouter;
