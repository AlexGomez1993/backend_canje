import { Promocion } from "../models/index.js";

const listarPromocion = async (req, res) => {
    try {
        const promociones = await Promocion.findAll({
            order: [["id", "DESC"]],
        });
        console.log(promociones);
        if (promociones.length === 0) {
            const error = new Error("No tienes promociones registradas");
            return res.status(404).json({ msg: error.message });
        }
        return res.status(200).json(promociones);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Error al obtener las promociones" });
    }
};

const activarPromocion = async (req, res) => {
    try {
        
        const { idPromocion } = req.body;

        if (!idPromocion) {
            const error = new Error("El id de la promocion es necesario");
            return res.status(400).json({ msg: error.message });
        }

        const promocion = await Promocion.findOne({
            where: { id: idPromocion },
        });

        if (!promocion) {
            const error = new Error("promocion no encontrada");
            return res.status(404).json({ msg: error.message });
        }

        console.log('promocion.activo', promocion.activo)
        promocion.activo = !promocion.activo ? true : false;

        await promocion.save();

        return res.status(200).json({
            msg: `Promocion actualizada correctamente`,
            promocion: promocion.nombre,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al activar la promocion" });
    }
};

export { listarPromocion, activarPromocion };
