import express from "express";
import db from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import tiendasRouter from "./routes/tiendaRoutes.js";
import provinciaRouter from "./routes/provinciaRoutes.js";
import ciudadRouter from "./routes/ciudadRoutes.js";
import noticiaRouter from "./routes/noticiaRoutes.js";
import formaPagoRouter from "./routes/formasPagoRoutes.js";
import usuarioRouter from "./routes/usuarioRoutes.js";
import autenticarJWT from "./middleware/auth.js";
import authRouter from "./routes/authRoutes.js";
import campaniaRouter from "./routes/campaniaRoutes.js";
import promocionRouter from "./routes/promocionRouter.js";
import variableRouter from "./routes/variableRoutes.js";
import configSaldoRouter from "./routes/configSaldo.js";
import clienteRouter from "./routes/clienteRoutes.js";

const app = express();

app.use(express.json());
app.use(express.static("./public"));

//conexion BDD
try {
    db.authenticate();
    db.sync();
    console.log(`Conexion exitosa a la BDD`);
} catch (error) {
    console.log("error en la base");
}

app.use(
    cors({
        origin: "*",
    })
);

app.use("/api/auth", authRouter);
app.use("/api/tiendas", autenticarJWT, tiendasRouter);
app.use("/api/provincias", autenticarJWT, provinciaRouter);
app.use("/api/ciudades", autenticarJWT, ciudadRouter);
app.use("/api/noticias", autenticarJWT, noticiaRouter);
app.use("/api/formasPago", autenticarJWT, formaPagoRouter);
app.use("/api/usuarios", autenticarJWT, usuarioRouter);
app.use("/api/campanias", autenticarJWT, campaniaRouter);
app.use("/api/promociones", autenticarJWT, promocionRouter);
app.use("/api/variables", autenticarJWT, variableRouter);
app.use("/api/configSaldos", autenticarJWT, configSaldoRouter);
app.use("/api/clientes", autenticarJWT, clienteRouter);

const PORT = process.env.BD_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
