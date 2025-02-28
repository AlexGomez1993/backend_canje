import Tienda from "./Tienda.js";
import Campania from "./Campania.js";
import Promocion from "./promocion.js";
import Ciudad from "./Ciudad.js";
import Cliente from "./Cliente.js";
import ConfigSaldo from "./ConfigSaldo.js";
import Cupon from "./Cupon.js";
import Factura from "./Factura.js";
import Formapago from "./FormaPago.js";
import Noticia from "./Noticia.js";
import Provincia from "./Provincia.js";
import Rol from "./Rol.js";
import Saldo from "./Saldo.js";
import SecuencialCampania from "./SecuencialCampania.js";
import Usuario from "./Usuario.js";
import Variable from "./Variable.js";

Campania.belongsToMany(Promocion, {
    through: "campania_promocion",
    foreignKey: "campania_id",
    otherKey: "promocion_id",
    timestamps: false,
});

Promocion.belongsToMany(Campania, {
    through: "campania_promocion",
    foreignKey: "promocion_id",
    otherKey: "campania_id",
    timestamps: false,
});

Ciudad.belongsTo(Provincia, {
    foreignKey: "provincia_id",
    as: "provincia",
});

Cliente.belongsTo(Provincia, {
    foreignKey: "provincia_id",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
});

Cliente.belongsTo(Ciudad, {
    foreignKey: "ciudad_id",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
});

Cliente.hasMany(Factura, {
    foreignKey: "cliente_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Factura.belongsTo(Cliente, {
    foreignKey: "cliente_id",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
});

ConfigSaldo.belongsTo(Campania, {
    foreignKey: "campania_id",
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
});
Cupon.belongsTo(Cliente, {
    foreignKey: "cliente_id",
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
});

Cupon.belongsTo(Campania, {
    foreignKey: "campania_id",
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
});

Cupon.belongsTo(Formapago, {
    foreignKey: "formapago_id",
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
});

Factura.belongsTo(Formapago, {
    foreignKey: "formapago_id",
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
});

Factura.belongsTo(Campania, {
    foreignKey: "campania_id",
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
});

Factura.belongsTo(Tienda, {
    foreignKey: "tienda_id",
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
});

Factura.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
});
Saldo.belongsTo(Cliente, {
    foreignKey: "cliente_id",
    as: "cliente",
});
Saldo.belongsTo(Campania, {
    foreignKey: "campania_id",
    as: "campania",
});
Saldo.belongsTo(Promocion, {
    foreignKey: "promocion_id",
    as: "promocion",
});
SecuencialCampania.belongsTo(Variable, {
    foreignKey: "variable_id",
    as: "variable",
});

SecuencialCampania.belongsTo(Campania, {
    foreignKey: "campania_id",
    as: "campania",
});

Usuario.belongsTo(Rol, {
    foreignKey: "rol_id",
    as: "rol",
});
export {
    Tienda,
    Campania,
    Promocion,
    Ciudad,
    Cliente,
    ConfigSaldo,
    Cupon,
    Factura,
    Formapago,
    Noticia,
    Provincia,
    Rol,
    Saldo,
    SecuencialCampania,
    Usuario,
    Variable,
};
