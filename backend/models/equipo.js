module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "Equipo",
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: { type: DataTypes.STRING(500), allowNull: false },
  
        estado: { type: DataTypes.TINYINT(4), allowNull: false, defaultValue: 1 },
        vp_deporte: { type: DataTypes.BIGINT, allowNull: false },        
      },
      {
        tableName: "equipo",
        timestamps: false,
      }
    );
  };
  