import { Formapago } from "../models/index.js";

const listarFormaPago = async (req, res) => {
    try {
        const formasPago = await Formapago.findAll({});

        if (formasPago.length === 0) {
            const error = new Error("No tienes formasPago registradas");
            return res.status(404).json({ msg: error.message });
        }
        return res.status(200).json(formasPago);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Error al obtener las formasPago" });
    }
};

export { listarFormaPago };
