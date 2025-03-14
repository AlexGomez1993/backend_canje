import express from "express";
import {
    agregarClienteWeb,
    login,
    loginCliente,
    validarCliente,
} from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/loginCliente", loginCliente);
authRouter.get("/validarCliente", validarCliente);
authRouter.post("/ingresarClienteWeb", agregarClienteWeb);

export default authRouter;
