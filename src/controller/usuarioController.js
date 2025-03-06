import { Rol, Usuario } from "../models/index.js";

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            where: {activo: 1},
            include: [
                {
                    model: Rol,
                    as: "rol",
                },
            ],
            attributes: { exclude: ['password', 'salt'] }
        });

        if (usuarios.length === 0) {
            const error = new Error("No tienes usuarios registrados");
            return res.status(404).json({ msg: error.message });
        }
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Error al obtener los usuarios" });
    }
};

export { listarUsuarios };
