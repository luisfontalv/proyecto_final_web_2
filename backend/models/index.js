const Sequelize = require("sequelize");
const config = require("../config/");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  logging: false,
});

const Deportista = require("./deportista")(sequelize, Sequelize.DataTypes);
const Equipo = require("./equipo")(sequelize, Sequelize.DataTypes);
const Parametro = require("./parametro")(sequelize, Sequelize.DataTypes);
const ValorParametro = require("./valor_parametro")(
  sequelize,
  Sequelize.DataTypes
);
const Premio = require("./premio")(sequelize, Sequelize.DataTypes);

ValorParametro.belongsTo(Parametro, {
  foreignKey: "id_parametros",
  as: "parametro",
});
Parametro.hasMany(ValorParametro, {
  foreignKey: "id_parametros",
  as: "valoresParametro",
});
Premio.belongsTo(Deportista, {
  foreignKey: "id_deportistas",
  as: "deportista",
});

Deportista.hasMany(Premio, {
  foreignKey: "id_deportistas",
  as: "premios",
});

Deportista.belongsTo(Equipo, {
  foreignKey: "id_equipos",
  as: "equipo",
});
Equipo.hasMany(Deportista, {
  foreignKey: "id_equipos",
  as: "deportistas",
});

sequelize.sync();

module.exports = { sequelize, Equipo, Deportista, Premio, Parametro, ValorParametro };
