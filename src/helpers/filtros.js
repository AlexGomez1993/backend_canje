import { Op } from "sequelize";

export const getFilters = (query) => {
    const { search, activo, ruc, estadoFactura } = query;
    const whereCondition = {};

    if (search) {
        whereCondition.nombre = { [Op.like]: `%${search}%` };
    }

    if (activo) {
        whereCondition.activo = activo;
    }

    if (ruc) {
        whereCondition.ruc = ruc;
    }

    if (estadoFactura) {
        whereCondition.estado = estadoFactura;
    }

    return whereCondition;
};
