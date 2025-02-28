import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Cliente = db.define(
    "cliente",
    {
        provincia_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ciudad_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ruc: {
            type: DataTypes.STRING(13),
            allowNull: true,
        },
        telefono: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        celular: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        saldo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        pasaporte: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        sexo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sector: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        edad: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        contrasena: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "cliente",
        timestamps: false,
    }
);

export default Cliente;
