import { Tienda } from "../models/index.js";

const listarTiendas = async (req, res) => {
    try {
        const tiendas = await Tienda.findAll({
            where: { activo: 1 },
            order: [["nombre", "ASC"]],
        });
        console.log(tiendas);
        if (tiendas.length === 0) {
            const error = new Error("No tienes tiendas registradas");
            return res.status(404).json({ msg: error.message });
        }
        return res.status(200).json(tiendas);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Error al obtener las tiendas" });
    }
};

export { listarTiendas };
