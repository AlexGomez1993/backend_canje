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
//const authRoutes = require('./src/routes/authRoutes');
//const userRoutes = require('./src/routes/userRoutes');


const app = express();
//para poder enviar respuestas tipo json
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

app.use("/api/tiendas", tiendasRouter);
app.use("/api/provincias", provinciaRouter);
app.use("/api/ciudades", ciudadRouter);
app.use("/api/noticias", noticiaRouter);
app.use("/api/formasPago", formaPagoRouter);
app.use("/api/usuarios", usuarioRouter);


const PORT = process.env.BD_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

