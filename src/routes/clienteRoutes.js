import express from "express";
import {
    crearClienteIsla,
    editarCliente,
    listarClientes,
    obtenerCliente,
} from "../controller/clienteController.js";

const clienteRouter = express.Router();

clienteRouter.get("/", listarClientes);
clienteRouter.get("/:rucCliente", obtenerCliente);
clienteRouter.post("/isla", crearClienteIsla);
clienteRouter.put("/:idCliente", editarCliente);

export default clienteRouter;
