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

const crearFormaPago = async (req, res) => {
    try {
        const { nombre, descripcion, factor } = req.body;

        if (!nombre) {
            return res.status(400).json({ msg: "El nombre es obligatorio" });
        }

        const nuevaFormaPago = await Formapago.create({
            nombre,
            descripcion,
            factor,
        });

        return res.status(201).json(nuevaFormaPago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al agregar la forma de pago" });
    }
};

const editarFormaPago = async (req, res) => {
    try {
        const { idFormaPago } = req.params;
        const { nombre, descripcion, factor, activo } = req.body;

        const formaPago = await Formapago.findByPk(idFormaPago);
        if (!formaPago) {
            return res.status(404).json({ msg: "Forma de pago no encontrada" });
        }

        formaPago.nombre = nombre || formaPago.nombre;
        formaPago.descripcion = descripcion || formaPago.descripcion;
        formaPago.factor = factor || formaPago.factor;
        formaPago.activo = activo !== undefined ? activo : formaPago.activo;

        await formaPago.save();

        return res.status(200).json(formaPago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al editar la forma de pago" });
    }
};

const activarFormaPago = async (req, res) => {
    try {
        const { idFormaPago } = req.body;

        if (!idFormaPago) {
            const error = new Error("El id de la forma de pago es necesario");
            return res.status(400).json({ msg: error.message });
        }

        const formapago = await Formapago.findOne({
            where: { id: idFormaPago },
        });

        if (!formapago) {
            const error = new Error("Forma de pago no encontrada");
            return res.status(404).json({ msg: error.message });
        }

        formapago.activo = !formapago.activo ? true : false;

        await formapago.save();

        return res.status(200).json({
            msg: `Forma de pago actualizada correctamente`,
            formaPago: formapago.nombre,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al activar la forma de pago" });
    }
};

export { listarFormaPago, crearFormaPago, editarFormaPago, activarFormaPago };
