import { Campania } from "../models/index.js";

const listarCampania = async (req, res) => {
    try {
        const campanias = await Campania.findAll({
            order: [["id", "DESC"]],
        });
        console.log(campanias);
        if (campanias.length === 0) {
            const error = new Error("No tienes campañas registradas");
            return res.status(404).json({ msg: error.message });
        }
        return res.status(200).json(campanias);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Error al obtener las campañas" });
    }
};

const activarCampania = async (req, res) => {
    try {
        
        const { idCampania } = req.body;

        if (!idCampania) {
            const error = new Error("El id de la campaña es necesario");
            return res.status(400).json({ msg: error.message });
        }

        const campania = await Campania.findOne({
            where: { id: idCampania },
        });

        if (!campania) {
            const error = new Error("Campaña no encontrada");
            return res.status(404).json({ msg: error.message });
        }

        console.log('campania.activo', campania.activo)
        campania.activo = !campania.activo ? true : false;

        await campania.save();

        return res.status(200).json({
            msg: `Campaña actualizada correctamente`,
            campania: campania.nombre,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al activar la campaña" });
    }
};

export { listarCampania, activarCampania };
