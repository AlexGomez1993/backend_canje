import { Op } from "sequelize";

export const getFilters = (query) => {
    const { search, activo, ruc } = query;
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

    return whereCondition;
};
