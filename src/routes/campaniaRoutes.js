import express from "express";
import { listarCampania,activarCampania } from "../controller/campaniaController.js";

const campaniaRouter = express.Router();

campaniaRouter.get("/", listarCampania);
campaniaRouter.post("/activarCampania", activarCampania);

export default campaniaRouter;
