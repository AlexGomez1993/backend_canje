import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Formapago = db.define(
    "formapago",
    {
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        factor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        activo: {
            type: DataTypes.TINYINT(1),
            allowNull: true,
        },
    },
    {
        tableName: "formapago",
        timestamps: false,
    }
);

export default Formapago;
