import { Variable, SecuencialCampania } from "../models/index.js";
import moment from "moment";

const listarVariables = async (req, res) => {
    try {
        const variables = await Variable.findAll({
            order: [["id", "DESC"]],
        });

        if (variables.length === 0) {
            const error = new Error("No tienes variables registradas");
            return res.status(404).json({ msg: error.message });
        }
        return res.status(200).json(variables);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Error al obtener las campañas" });
    }
};

const crearVariable = async (req, res) => {
    try {
        const { nombre, descripcion, valor, valoractual, idCampania } =
            req.body;

        const variable = await Variable.create({
            nombre,
            descripcion,
            valor,
            valoractual,
        });

        if (!variable) {
            const error = new Error("Error al crear la variable");
            return res.status(404).json({ msg: error.message });
        }

        await SecuencialCampania.create({
            variable_id: variable.id,
            campania_id: idCampania,
            fecha: moment().subtract(5, "hours").format("YYYY-MM-DD HH:mm:ss"),
        });
        return res.status(200).json({
            msg: `variable creada correctamente`,
            campania: variable.nombre,
            id: variable.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la variable" });
    }
};

const editarVariable = async (req, res) => {
    try {
        const { idVariable } = req.params;
        const { nombre, descripcion, valor, valoractual } = req.body;

        const variable = await Variable.findByPk(idVariable);
        if (!variable) {
            return res.status(404).json({ msg: "Campaña no encontrada" });
        }

        variable.nombre = nombre || variable.nombre;
        variable.descripcion = descripcion || variable.descripcion;
        variable.valor = valor || variable.valor;
        variable.valoractual = valoractual || variable.valoractual;

        await variable.save();

        return res.status(200).json({
            msg: `Variable actualizada correctamente`,
            variable: variable.nombre,
            id: variable.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la variable" });
    }
};

export { listarVariables, crearVariable, editarVariable };
