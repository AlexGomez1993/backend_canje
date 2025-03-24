import express from "express";
import {
    listarFacturas,
    ingresarFacturasIsla,
    ingresarFacturasWeb,
    rechazarFacturaWeb,
    procesarFacturaWeb,
} from "../controller/facturasController.js";

const facturasRouter = express.Router();

facturasRouter.get("/", listarFacturas);
facturasRouter.post("/facturasIsla", ingresarFacturasIsla);
facturasRouter.post("/facturasWeb", ingresarFacturasWeb);
facturasRouter.put("/rechazarFacturaWeb", rechazarFacturaWeb);
facturasRouter.put("/procesarFacturaWeb", procesarFacturaWeb);

export default facturasRouter;
