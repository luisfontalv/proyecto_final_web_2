module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Deportista",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: { type: DataTypes.STRING(500), allowNull: false },
      fecha_nacimiento: { type: DataTypes.DATEONLY, allowNull: false },

      estado: { type: DataTypes.TINYINT(4), allowNull: false, defaultValue: 1 },
      vp_genero: { type: DataTypes.BIGINT, allowNull: false },
      vp_deporte: { type: DataTypes.BIGINT, allowNull: false },
      id_equipos: { type: DataTypes.BIGINT, allowNull: false },
      
    },
    {
      tableName: "deportista",
      timestamps: false,
    }
  );
};
