import { Tienda } from "../models/index.js";

const listarTiendas = async (req, res) => {
    try {
        const tiendas = await Tienda.findAll({
            order: [["nombre", "ASC"]],
        });

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

const activarTienda = async (req, res) => {
    try {
        const { idTienda } = req.body;

        if (!idTienda) {
            const error = new Error("El id de la tienda es necesario");
            return res.status(400).json({ msg: error.message });
        }

        const tienda = await Tienda.findOne({
            where: { id: idTienda },
        });

        if (!tienda) {
            const error = new Error("tienda no encontrada");
            return res.status(404).json({ msg: error.message });
        }

        tienda.activo = !tienda.activo ? true : false;

        await tienda.save();

        return res.status(200).json({
            msg: `tienda actualizada correctamente`,
            tienda: tienda.nombre,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al activar la tienda" });
    }
};

const crearTienda = async (req, res) => {
    try {
        const { nombre, descripcion, numcupones } = req.body;

        const tienda = await Tienda.create({
            nombre,
            descripcion,
            numcupones,
        });

        return res.status(200).json({
            msg: `tienda creada correctamente`,
            tienda: tienda.nombre,
            id: tienda.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la tienda" });
    }
};

const editarTienda = async (req, res) => {
    try {
        const { idTienda } = req.params;
        const { nombre, descripcion, numcupones, activo } = req.body;

        const tienda = await Tienda.findByPk(idTienda);
        if (!tienda) {
            return res.status(404).json({ msg: "Tienda no encontrada" });
        }

        tienda.nombre = nombre || tienda.nombre;
        tienda.descripcion = descripcion || tienda.descripcion;
        tienda.numcupones = numcupones || tienda.numcupones;
        tienda.activo = activo !== undefined ? activo : tienda.activo;

        await tienda.save();

        return res.status(200).json({
            msg: `Tienda actualizada correctamente`,
            tienda: tienda.nombre,
            id: tienda.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la tienda" });
    }
};

const obtenerTienda = async (req, res) => {
    try {
        const { idTienda } = req.params;

        const tienda = await Tienda.findByPk(idTienda);

        if (!tienda) {
            return res.status(404).json({ msg: "Tienda no encontrada" });
        }

        return res.status(200).json({
            tienda,
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la tienda" });
    }
};

export { listarTiendas, activarTienda, crearTienda, editarTienda, obtenerTienda };
