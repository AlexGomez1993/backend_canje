import { Campania, Promocion, Tienda } from "../models/index.js";

const listarCampania = async (req, res) => {
    try {
        const campanias = await Campania.findAll({
            order: [["id", "DESC"]],
        });
        
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

const crearCampania = async (req, res) => {
    try {
        const { nombre, descripcion, logo } = req.body;

        const campania = await Campania.create({
            nombre,
            descripcion,
            logo,
        });

        return res.status(200).json({
            msg: `campaña creada correctamente`,
            campania: campania.nombre,
            id: campania.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la campaña" });
    }
};

const agregarTiendas = async (req, res) => {
    try {
        const { campaniaId, tiendasIds } = req.body;

        const campania = await Campania.findByPk(campaniaId);
        if (!campania) {
            throw new Error("Campaña no encontrada");
        }

        const tiendas = await Tienda.findAll({
            where: { id: tiendasIds },
        });

        if (tiendas.length !== tiendasIds.length) {
            return res
                .status(400)
                .json({
                    error: "Algunas tiendas no existen en la base de datos",
                });
        }
        await campania.addTiendas(tiendasIds);

        return res.status(200).json({
            msg: `tiendas agregadas a la campaña ${campania.nombre} correctamente`,
            campania: campania.nombre,
            id: campania.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al agregar las tiendas a la campaña",
        });
    }
};

const agregarPromociones = async (req, res) => {
    try {
        const { campaniaId, promocionesIds } = req.body;

        const campania = await Campania.findByPk(campaniaId);
        if (!campania) {
            return res.status(404).json({ error: "Campaña no encontrada" });
        }

        const promociones = await Promocion.findAll({
            where: { id: promocionesIds },
        });

        if (promociones.length !== promocionesIds.length) {
            return res
                .status(400)
                .json({
                    error: "Algunas promociones no existen en la base de datos",
                });
        }

        await campania.addPromocion(promocionesIds);

        return res.status(200).json({
            msg: `promociones agregadas a la campaña ${campania.nombre} correctamente`,
            campania: campania.nombre,
            id: campania.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al agregar las promociones a la campaña",
        });
    }
};

export {
    listarCampania,
    activarCampania,
    crearCampania,
    agregarTiendas,
    agregarPromociones,
};
