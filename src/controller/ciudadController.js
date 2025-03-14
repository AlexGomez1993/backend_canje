import { getFilters } from "../helpers/filtros.js";
import { getPagination } from "../helpers/paginacion.js";
import { Ciudad, Provincia } from "../models/index.js";

const listarCiudades = async (req, res) => {
    try {
        const filtros = getFilters(req.query);
        const paginacion = getPagination(req.query);

        let queryOptions = {
            where: filtros,
            order: [["nombre", "ASC"]],
        };

        if (paginacion.limit) {
            queryOptions.limit = paginacion.limit;
            queryOptions.offset = paginacion.offset;
        }

        const { count, rows } = await Ciudad.findAndCountAll(queryOptions);

        if (count === 0) {
            const error = new Error("No tienes ciudades registradas");
            return res.status(404).json({ msg: error.message });
        }
        return res.status(200).json({
            total: count,
            pagina: paginacion.page,
            limit: paginacion.limit,
            totalPaginas: paginacion.limit
                ? Math.ceil(count / paginacion.limit)
                : 1,
            data: rows,
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Error al obtener las ciudades" });
    }
};

export { listarCiudades };
